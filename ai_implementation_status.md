# AI Assistant Implementation Status

## 🚀 Overview
The AI Assistant provides a smart, chat-like recommendation interface seamlessly integrated into the Evento app. It processes user search queries using natural language rules and recommends internal props or provides external search links for unmatched items.

---

## ✅ What is Implemented (Current State)

### 1. State Management (Redux + Saga)
- **Store (`src/store/aiAssistant/slice.ts`)**: Manages chat history, recommended props, external suggestions, loading state, and follow-up questions.
- **Saga (`src/sagas/aiAssistantSaga.ts`)**: Orchestrates the async flow—parsing the query, fetching data, computing scores, generating responses, and dispatching Redux actions. Connected successfully in `rootSaga.tsx`.

### 2. Logic & Engine (`src/utils/aiAssistant/`)
- **Query Parser (`queryParser.ts`)**: Extracts budgets ("under 50k"), themes ("pastel", "rustic"), and event types ("wedding", "birthday").
- **Recommendation Engine (`recommendationEngine.ts`)**: Scores props (+3 for theme match, +2 for budget fit, +2 for stock availability) and sorts results.
- **Response Generator (`responseGenerator.ts`)**: Builds dynamic, natural-sounding assistant replies and follow-up questions when information (like budget) is missing.
- **External Suggestions (`externalSuggestions.ts`)**: Generates deep links to Amazon, Flipkart, and Google when internal inventory lacks strong matches (< 3 results).

### 3. UI Components
- **`AIAssistantSection.tsx`**: Renders chat bubbles, dynamic follow-up texts, scrollable prop cards with match reasons, and external marketplace links.
- **Integration**: `EventSearchForm.tsx` (the top search bar) captures user input and triggers `submitAIQuery(query)` on submit. `MainList.tsx` correctly hosts the UI directly below the ad banners.

### 4. Data Layer mock (`src/services/firebase/propService.ts`)
- Currently uses a robust local **mock dataset** (e.g., Pastel Welcome Board, Neon Signs) with simulated network delays so the UI can be tested without a database.

---

## ⏳ What Needs To Be Done (Next Steps)

1. **Firebase Connection**:
   - Install `@react-native-firebase/firestore`.
   - Setup a `props` collection in Firebase Console matching the provided schema.
   - Switch `getPropsFromFirebase` in `propService.ts` from mock data to the real Firestore query.

2. **UI Polish & Tweaks**:
   - Test UI responsiveness on smaller devices.
   - Design empty states or error states visually if desired.

3. **Advanced Parsing (Optional)**:
   - Expand the rule-based keyword lists in `queryParser.ts` as catalog grows.
   - Consider a lightweight machine learning categorization API only if rule-based fails to scale.

---

## ⚙️ Functionality Flow (How it runs)

1. User enters text like *"wedding outdoor floral setup under 10000"* in the top `EventSearchForm`.
2. Hitting search dispatches the `submitAIQuery` action to Redux.
3. The `aiAssistantSaga` intercepts the action and:
   - Calls **Parser** to grab `{ eventType: 'wedding', budget: 10000, themes: ['outdoor', 'floral'] }`.
   - Calls **propService** to fetch all inventory (mocked).
   - Calls **Scoring Engine** to rank each prop against the parsed filters.
   - Calls **Response Generator** to craft the AI text message.
   - If results < 3, calls **External Suggestions** to build Amazon/Flipkart links.
4. Saga puts `aiQuerySuccess` into Redux state.
5. `AIAssistantSection.tsx` (rendered inside `ProductDashboard`) re-renders:
   - Displays the user query bubble.
   - Displays the AI response bubble.
   - Renders a horizontal scroll of matched props.
   - Unveils external links if the local inventory fell short.
