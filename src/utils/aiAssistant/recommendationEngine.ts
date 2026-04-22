import { PropItem } from '../../store/aiAssistant/slice';
import { ParsedFilters } from './queryParser';

export const scoreAndFilterProps = (
    props: PropItem[],
    filters: ParsedFilters
): PropItem[] => {
    return props
        .map(prop => {
            let score = 0;
            let reasons: string[] = [];

            // Theme match
            const matchingThemes = filters.themeOrColor.filter(
                t => prop.theme.includes(t) || prop.color.includes(t) || prop.tags.includes(t)
            );
            if (matchingThemes.length > 0) {
                score += 3 * matchingThemes.length;
                reasons.push(`Matches ${matchingThemes.join(', ')} theme`);
            }

            // Budget fit
            if (filters.budget !== null) {
                if (prop.price <= filters.budget) {
                    score += 2;
                    reasons.push('Fits your budget');
                } else {
                    score -= 5; // strictly penalize over budget
                }
            }

            // Availability
            if (prop.available) {
                score += 2;
            } else {
                score -= 10; // Out of stock is heavily penalized
            }

            // Rating
            if (prop.rating >= 4.0) {
                score += 1;
            }

            const matchReason = reasons.length > 0
                ? reasons.join(' and ')
                : 'Might be a good fit';

            return { ...prop, score, matchReason };
        })
        .filter(prop => prop.score > 0)
        .sort((a, b) => (b as any).score - (a as any).score)
        .map(({ score, ...prop }: any) => prop as PropItem);
};
