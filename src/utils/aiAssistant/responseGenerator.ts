import { ParsedFilters } from './queryParser';

export const generateAssistantResponse = (
    filters: ParsedFilters,
    matchCount: number
): { assistantMessage: string; followUpQuestion: string | null } => {
    let text = '';
    let followUp: string | null = null;

    if (matchCount > 0) {
        if (filters.themeOrColor.length > 0) {
            text = `${filters.themeOrColor.join(' and ')} decor works very well for such events, creating a beautiful look. I found a few highly suitable items for you.`;
        } else {
            text = `I found some excellent options that would be perfect for your event!`;
        }

        // Determine follow up
        if (!filters.location) {
            followUp = "To check exact delivery and availability, could you specify your location or venue area?";
        } else if (!filters.budget) {
            followUp = "Do you have a specific budget in mind so I can filter these further?";
        }
    } else {
        // No matches
        text = `I searched our inventory but couldn't find exact matches for "${filters.rawQuery}" right now. I've gathered some external search options where you might find what you're looking for.`;

        if (!filters.budget) {
            followUp = "What is your budget? I can perhaps suggest alternative themes that fit.";
        }
    }

    return {
        assistantMessage: text,
        followUpQuestion: followUp
    };
};
