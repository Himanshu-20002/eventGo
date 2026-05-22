# AI Assistant Implementation Status

## 🚀 Overview
The AI Assistant provides a smart, chat-like recommendation interface seamlessly integrated into the Evento app. It processes user search queries using natural language rules and recommends internal props or provides external search links for unmatched items.

---

## ✅ What is Implemented (Current State)

### 1. State Management (Redux + Saga)
- **Store (`src/store/aiAssistant/slice.ts`)**: Manages chat history, recommended props, external suggestions, loading state, and follow-up questions.
- **Saga (`src/sagas/aiAssistantSaga.ts`)**: Orchestrates the async flow—retrieves the active chat history for multi-turn conversational context, fetches catalog data, calls the OpenRouter service, maps recommendations, and dispatches success/failure actions.

### 2. Real AI Integration (OpenRouter)
- **Config (`src/services/ai/config.ts`)**: Configures the OpenRouter API Key and default LLM (`google/gemini-2.5-flash`).
- **Service (`src/services/ai/openRouterService.ts`)**: Handles communication with the OpenRouter API. Passes the user query, chat history context, and simplified inventory catalog. Requests structured JSON output containing the assistant message, recommended item IDs, custom match reasons, external search suggestions, and a follow-up question.
- **Fallback Engine**: If the OpenRouter call fails (due to network, timeouts, limits, etc.), the saga transparently falls back to the local rule-based engine to ensure uninterrupted user experience.

### 3. Logic & Engine (Local Fallback) (`src/utils/aiAssistant/`)
- **Query Parser (`queryParser.ts`)**: Local regex parser to extract budget, themes, and event type.
- **Recommendation Engine (`recommendationEngine.ts`)**: Scores props locally (+3 for theme, +2 for budget, etc.).
- **Response Generator (`responseGenerator.ts`)**: Generates pre-written local assistant messages and follow-up prompts.
- **External Suggestions (`externalSuggestions.ts`)**: Generates deep links when inventory is low (< 3 matches).

### 4. UI Components
- **`AIAssistantSection.tsx`**: Renders chat bubbles, dynamic follow-up texts, scrollable prop cards with match reasons, and external marketplace links.
- **Integration**: `EventSearchForm.tsx` (the top search bar) captures user input and triggers `submitAIQuery(query)` on submit. `MainList.tsx` correctly hosts the UI directly below the ad banners.

### 5. Data Layer (`src/services/firebase/propService.ts`)
- Fetches all event props from Firestore (`props` collection) or falls back gracefully to a robust local mock dataset if Firestore collection is empty or offline.

---

## ⏳ What Needs To Be Done (Next Steps)

1. **UI Polish & Tweaks**:
   - Design empty states or error states visually if desired.
   - Adjust spacing and font-sizes for smaller device formats.

---

## ⚙️ Functionality Flow (How it runs)

1. User enters text like *"wedding outdoor floral setup under 10000"* in the top `EventSearchForm` or clicks a quick starter.
2. Hitting search dispatches the `submitAIQuery` action to Redux.
3. The `aiAssistantSaga` intercepts the action and:
   - Fetches all inventory props from Firestore (or mock dataset fallback).
   - Retrieves the last 10 chat messages from Redux to preserve conversation context.
   - Calls **OpenRouter AI Service** with the query, history, and inventory.
   - If OpenRouter succeeds, it maps the returned recommendation IDs and custom match reasons back to the inventory items.
   - If OpenRouter fails, it calls the local **Query Parser**, **Scoring Engine**, and **Response Generator** as a fallback.
4. Saga puts `aiQuerySuccess` into Redux state with recommendations, message, and follow-up question.
5. `AIAssistantSection.tsx` (rendered inside `ProductDashboard` and `AISearchScreen`) re-renders:
   - Displays the user query bubble.
   - Displays the AI response bubble.
   - Renders a horizontal scroll of matched props with personalized match reasons.
   - Unveils external links if matches are scarce.

