import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    aiQuerySuccess,
    aiQueryFailure,
    submitAIQuery,
    PropItem,
    ExternalSuggestion,
    ChatMessage
} from '../store/aiAssistant/slice';

import { RootState } from '../store/store';
import { parseQuery, ParsedFilters } from '../utils/aiAssistant/queryParser';
import { getPropsFromFirebase } from '../services/firebase/propService';
import { scoreAndFilterProps } from '../utils/aiAssistant/recommendationEngine';
import { generateAssistantResponse } from '../utils/aiAssistant/responseGenerator';
import { generateExternalSuggestions } from '../utils/aiAssistant/externalSuggestions';
import { callOpenRouterAI, OpenRouterAIResult } from '../services/ai/openRouterService';

function* handleAIQuery(action: PayloadAction<string>): any {
    try {
        const rawQuery = action.payload;

        // 1. Fetch mock or actual props from Firebase
        const allProps: PropItem[] = yield call(getPropsFromFirebase);

        // 2. Fetch history from Redux store for conversation context
        const history: ChatMessage[] = yield select((state: RootState) => state.aiAssistant.history);

        try {
            console.log("Attempting to request recommendations from OpenRouter...");
            // 3. Call OpenRouter service
            const aiResult: OpenRouterAIResult = yield call(callOpenRouterAI, rawQuery, history, allProps);

            // 4. Map the recommended IDs back to our inventory PropItems, preserving order
            const recommendedProps: PropItem[] = [];
            for (const id of aiResult.recommendedPropIds) {
                const matchedProp = allProps.find(p => p.id === id);
                if (matchedProp) {
                    recommendedProps.push({
                        ...matchedProp,
                        matchReason: aiResult.recommendedPropMatchReasons[id] || "Fits your design criteria"
                    });
                }
            }

            // 5. Store final response in Redux
            yield put(aiQuerySuccess({
                assistantMessage: aiResult.assistantMessage,
                recommendedProps,
                externalSuggestions: aiResult.externalSuggestions,
                followUpQuestion: aiResult.followUpQuestion,
            }));
            
            console.log("Successfully loaded recommendations from OpenRouter!");
            return;
        } catch (apiError: any) {
            console.warn("OpenRouter API failed. Falling back to local rule-based AI engine.", apiError);
        }

        // --- FALLBACK LOCAL ENGINE ---
        // 1. Parse query with regex rules
        const parsedFilters: ParsedFilters = yield call(parseQuery, rawQuery);

        // 2. Compute recommendation scores locally
        const recommendedProps: PropItem[] = yield call(scoreAndFilterProps, allProps, parsedFilters);

        // 3. Build assistant response & follow up question locally
        const responseData: { assistantMessage: string; followUpQuestion: string | null } = yield call(
            generateAssistantResponse,
            parsedFilters,
            recommendedProps.length
        );
        const { assistantMessage, followUpQuestion } = responseData;

        // 4. Build external suggestions locally
        let externalSuggestions: ExternalSuggestion[] = yield call(generateExternalSuggestions, parsedFilters, rawQuery);
        yield delay(1000); // Simulate local processing delay

        // 5. Store final response in Redux
        yield put(aiQuerySuccess({
            assistantMessage: `[Local Assistant] ${assistantMessage}`,
            recommendedProps,
            externalSuggestions,
            followUpQuestion,
        }));

    } catch (error: any) {
        yield put(aiQueryFailure(error.message || 'Something went wrong processing your request.'));
    }
}

export default function* aiAssistantSaga() {
    yield takeLatest(submitAIQuery.type, handleAIQuery);
}

