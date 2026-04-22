import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PropItem {
    id: string;
    name: string;
    description: string;
    category: string;
    theme: string[];
    color: string[];
    tags: string[];
    price: number;
    rating: number;
    available: boolean;
    stock: number;
    image: string;
    matchReason?: string;
    vendorName?: string;
}

export interface ExternalSuggestion {
    id: string;
    title: string;
    platform: 'Amazon' | 'Flipkart' | 'Meesho' | 'Google';
    url: string;
    imageUrl?: string;
    price?: number | string;
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: number;
}

export interface AIAssistantState {
    history: ChatMessage[];
    recommendedProps: PropItem[];
    externalSuggestions: ExternalSuggestion[];
    followUpQuestion: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AIAssistantState = {
    history: [],
    recommendedProps: [],
    externalSuggestions: [],
    followUpQuestion: null,
    loading: false,
    error: null,
};

export const aiAssistantSlice = createSlice({
    name: 'aiAssistant',
    initialState,
    reducers: {
        submitAIQuery: (state, action: PayloadAction<string>) => {
            state.history.push({
                id: Date.now().toString(),
                text: action.payload,
                sender: 'user',
                timestamp: Date.now(),
            });
            state.loading = true;
            state.error = null;
            state.recommendedProps = [];
            state.externalSuggestions = [];
            state.followUpQuestion = null;
        },
        aiQuerySuccess: (
            state,
            action: PayloadAction<{
                assistantMessage: string;
                recommendedProps: PropItem[];
                externalSuggestions: ExternalSuggestion[];
                followUpQuestion: string | null;
            }>
        ) => {
            state.loading = false;
            state.history.push({
                id: Date.now().toString() + '-assistant',
                text: action.payload.assistantMessage,
                sender: 'assistant',
                timestamp: Date.now(),
            });
            state.recommendedProps = action.payload.recommendedProps;
            state.externalSuggestions = action.payload.externalSuggestions;
            state.followUpQuestion = action.payload.followUpQuestion;
        },
        aiQueryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.history.push({
                id: Date.now().toString() + '-error',
                text: "I encountered an error trying to process your request.",
                sender: 'assistant',
                timestamp: Date.now(),
            });
        },
        clearHistory: (state) => {
            state.history = [];
            state.recommendedProps = [];
            state.externalSuggestions = [];
            state.followUpQuestion = null;
        }
    },
});

export const { submitAIQuery, aiQuerySuccess, aiQueryFailure, clearHistory } = aiAssistantSlice.actions;
export default aiAssistantSlice.reducer;
