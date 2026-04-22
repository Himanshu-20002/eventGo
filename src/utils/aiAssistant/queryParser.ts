export interface ParsedFilters {
    budget: number | null;
    eventType: string | null;
    themeOrColor: string[];
    location: string | null;
    rawQuery: string;
}

export const parseQuery = (query: string): ParsedFilters => {
    const lowerQuery = query.toLowerCase();

    // Extract budget
    let budget: number | null = null;
    const budgetMatch = lowerQuery.match(/(?:under|below|max)\s*(\d+k?)/);
    if (budgetMatch) {
        let raw = budgetMatch[1];
        if (raw.endsWith('k')) {
            budget = parseInt(raw) * 1000;
        } else {
            budget = parseInt(raw);
        }
    }

    // Extract event type
    const eventTypes = ['wedding', 'birthday', 'baby shower', 'corporate', 'party', 'anniversary'];
    const eventType = eventTypes.find(type => lowerQuery.includes(type)) || null;

    // Extract theme/colors
    const themes = ['pastel', 'floral', 'gold', 'elegant', 'rustic', 'neon', 'vintage', 'indoor', 'outdoor'];
    const themeOrColor = themes.filter(theme => lowerQuery.includes(theme));

    return {
        budget,
        eventType,
        themeOrColor,
        location: null,
        rawQuery: query
    };
};
