import { ExternalSuggestion } from '../../store/aiAssistant/slice';
import { ParsedFilters } from './queryParser';

export const generateExternalSuggestions = (
    filters: ParsedFilters,
    rawQuery: string
): ExternalSuggestion[] => {
    const queryToSearch = encodeURIComponent(rawQuery);
    const platforms: ('Amazon' | 'Flipkart' | 'Meesho' | 'Google')[] = ['Amazon', 'Flipkart', 'Meesho'];

    return platforms.map((platform, index) => {
        let url = '';
        let imageUrl = 'https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70';
        let price = Math.floor(Math.random() * 2000) + 500;
        let title = `${filters.rawQuery}`;

        switch (platform) {
            case 'Amazon':
                url = `https://www.amazon.in/s?k=${queryToSearch}`;
                imageUrl = 'https://m.media-amazon.com/images/I/71tGtBuo0yL._AC_UY436_FMwebp_QL65_.jpg';
                title = `Amazon: ${filters.rawQuery}`;
                break;
            case 'Flipkart':
                url = `https://www.flipkart.com/search?q=${queryToSearch}`;
                imageUrl = 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/a346fdef9457ab5e.jpg?q=20';
                title = `Flipkart: ${filters.rawQuery}`;
                break;
            case 'Meesho':
            case 'Google':
                url = `https://www.google.com/search?q=${queryToSearch}+buy+${platform.toLowerCase()}`;
                imageUrl = 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/1bd8d123afe6cd26.jpg?q=20';
                title = `Meesho: ${filters.rawQuery}`;
                break;
        }

        return {
            id: `${platform}-${index}`,
            title,
            platform,
            url,
            imageUrl,
            price
        };
    });
};
