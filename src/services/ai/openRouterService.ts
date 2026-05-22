import axios from 'axios';
import { OPENROUTER_API_KEY, OPENROUTER_MODEL, OPENROUTER_API_URL } from './config';
import { PropItem, ExternalSuggestion, ChatMessage } from '../../store/aiAssistant/slice';

export interface OpenRouterAIResult {
    assistantMessage: string;
    recommendedPropIds: string[];
    recommendedPropMatchReasons: { [key: string]: string };
    externalSuggestions: ExternalSuggestion[];
    followUpQuestion: string | null;
}

export const callOpenRouterAI = async (
    query: string,
    history: ChatMessage[],
    catalog: PropItem[]
): Promise<OpenRouterAIResult> => {
    try {
        if (!OPENROUTER_API_KEY) {
            throw new Error("OpenRouter API key is missing.");
        }

        // Simplify catalog to reduce token usage and focus LLM
        const simplifiedCatalog = catalog.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            rating: p.rating,
            available: p.available,
            category: p.category,
            theme: p.theme,
            color: p.color,
            tags: p.tags,
            description: p.description
        }));

        // Format recent history (limit to last 10 messages to keep context short and relevant)
        const formattedHistory = history
            .slice(-10)
            .map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));

        const systemInstruction = `
You are the "eventoGo Neural Assistant", an elite, creative, and professional AI event decorator and planner. 
Your goal is to help users find the perfect event props and decorations from our inventory catalog.

Here is the current available inventory catalog of event props:
${JSON.stringify(simplifiedCatalog, null, 2)}

Instructions:
1. Analyze the user's query and the chat history context.
2. Search the catalog for items that match the user's desired themes, colors, event type, budget, and tags.
3. Heavily penalize items that are not available (available: false).
4. Provide a conversational, elegant, and modern response recommending the matching items (aim for at least 1-3 recommendations if possible).
5. For each recommended item, provide a personalized match reason explaining why it fits (e.g., "Fits pastel birthday theme and is under your budget").
6. If there are fewer than 3 good matches in the catalog, generate 1-2 external suggestions for popular marketplaces (like Amazon, Flipkart, Google, Meesho) with appropriate, realistic search URLs so they can find alternative options.
7. If critical information is missing to make a perfect suggestion (like the event type, specific budget, or location/venue type), ask a helpful follow-up question.
8. You MUST return a single, strictly valid JSON object. Do not output any markdown code blocks, HTML tags, or trailing text. The output must be parseable directly by JSON.parse.

JSON Response Schema:
{
  "assistantMessage": "Conversational assistant text response. Write this elegantly, referencing why the recommended items are great for their event.",
  "recommendedPropIds": ["list of matching item IDs in order of relevance"],
  "recommendedPropMatchReasons": {
    "item_id_1": "Custom match explanation for item_id_1",
    "item_id_2": "Custom match explanation for item_id_2"
  },
  "externalSuggestions": [
    {
      "id": "ext_1",
      "title": "Amazon: Search for Pastel Welcome Arch",
      "platform": "Amazon",
      "url": "https://www.amazon.in/s?k=pastel+welcome+arch"
    }
  ],
  "followUpQuestion": "A friendly follow-up question to ask next, or null if all information is complete."
}
`;

        const messages = [
            {
                role: 'system',
                content: systemInstruction
            },
            ...formattedHistory
        ];

        // Ensure current query is included if not already at the end of history
        if (formattedHistory.length === 0 || formattedHistory[formattedHistory.length - 1].content !== query) {
            messages.push({
                role: 'user',
                content: query
            });
        }

        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: OPENROUTER_MODEL,
                messages: messages,
                response_format: { type: 'json_object' }, // Request JSON output from models that support it
                max_tokens: 2000
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://github.com/Himanshu-20002/eventGo',
                    'X-OpenRouter-Title': 'eventoGo Neural Assistant'
                },
                timeout: 10000 // 10s timeout
            }
        );

        const content = response.data?.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error("Empty response from OpenRouter.");
        }

        // Clean up code block backticks if the model returned them anyway
        let cleanContent = content.trim();
        if (cleanContent.startsWith("```")) {
            // Strip leading ```json or ```
            cleanContent = cleanContent.replace(/^```(json)?/, "");
            // Strip trailing ```
            cleanContent = cleanContent.replace(/```$/, "");
            cleanContent = cleanContent.trim();
        }

        const result: OpenRouterAIResult = JSON.parse(cleanContent);
        
        // Ensure expected structure is present
        return {
            assistantMessage: result.assistantMessage || "I found some options for your event.",
            recommendedPropIds: Array.isArray(result.recommendedPropIds) ? result.recommendedPropIds : [],
            recommendedPropMatchReasons: result.recommendedPropMatchReasons || {},
            externalSuggestions: Array.isArray(result.externalSuggestions) ? result.externalSuggestions : [],
            followUpQuestion: result.followUpQuestion || null
        };

    } catch (error: any) {
        console.error("OpenRouter API error:", error);
        throw new Error(error.response?.data?.error?.message || error.message || "Failed to contact AI service.");
    }
};
