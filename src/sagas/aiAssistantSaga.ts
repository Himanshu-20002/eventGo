import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    aiQuerySuccess,
    aiQueryFailure,
    submitAIQuery,
    PropItem,
    ExternalSuggestion
} from '../store/aiAssistant/slice';

import { parseQuery, ParsedFilters } from '../utils/aiAssistant/queryParser';
import { getPropsFromFirebase } from '../services/firebase/propService';
import { scoreAndFilterProps } from '../utils/aiAssistant/recommendationEngine';
import { generateAssistantResponse } from '../utils/aiAssistant/responseGenerator';
import { generateExternalSuggestions } from '../utils/aiAssistant/externalSuggestions';

function* handleAIQuery(action: PayloadAction<string>): any {
    try {
        const rawQuery = action.payload;

        // 1. Parse query
        const parsedFilters: ParsedFilters = yield call(parseQuery, rawQuery);

        // 2. Fetch mock or actual props from Firebase
        const allProps: PropItem[] = yield call(getPropsFromFirebase);

        // 3. Compute recommendation scores
        const recommendedProps: PropItem[] = yield call(scoreAndFilterProps, allProps, parsedFilters);

        // 4. Build assistant response & follow up question
        const responseData: { assistantMessage: string; followUpQuestion: string | null } = yield call(
            generateAssistantResponse,
            parsedFilters,
            recommendedProps.length
        );
        const { assistantMessage, followUpQuestion } = responseData;

        // 5. Build external suggestions
        let externalSuggestions: ExternalSuggestion[] = yield call(generateExternalSuggestions, parsedFilters, rawQuery);
        // Simulate network delay to make it feel like AI processing
        yield delay(1500);

        // 6. Store final response in Redux
        yield put(aiQuerySuccess({
            assistantMessage,
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
