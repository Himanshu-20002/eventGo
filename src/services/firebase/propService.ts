import { PropItem } from '../../store/aiAssistant/slice';
import firestore from '@react-native-firebase/firestore';

export const getPropsFromFirebase = async (): Promise<PropItem[]> => {
    try {
        const snapshot = await firestore().collection('props').get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            
            // We need to map the uploaded database structure to the expected 'PropItem' interface.
            // Some fields like 'image', 'description', and 'stock' were missing in your upload script,
            // so we add safe default fallbacks to prevent the UI from crashing.
            return {
                id: doc.id,
                name: data.name || 'Unnamed decor',
                description: data.description || 'A beautiful decoration for your event.',
                category: data.category || 'Decor',
                
                // The interface expects array but db has it uploaded as string sometimes
                theme: Array.isArray(data.theme) ? data.theme : (data.theme ? [data.theme] : []),
                color: Array.isArray(data.color) ? data.color : (data.color ? [data.color] : []),
                tags: Array.isArray(data.tags) ? data.tags : [],
                
                price: Number(data.price) || 0,
                rating: Number(data.rating) || 0,
                available: typeof data.available === 'boolean' ? data.available : true,
                stock: data.stock !== undefined ? Number(data.stock) : 10,
                
                // Provide a placeholder image since it wasn't specified in the database upload
                image: data.image || 'https://images.unsplash.com/photo-1542360551-0373ab1ee452?q=80&w=300',
                vendorName: data.vendorName || 'eventoGo Provider',
            } as PropItem;
        });
    } catch (error) {
        console.error("Error fetching props from Firestore:", error);
        return [];
    }
};
