import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { persistStore, persistReducer } from 'redux-persist';
import reduxStorage from "./Storage";
import { configureStore } from "@reduxjs/toolkit";


//create saga middleware
const sagaMiddleware=createSagaMiddleware()

//create persist config
const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['cart','account'],
    blacklist: [],
}

//create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//mount it on store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)

//create persistor
export const persistor = persistStore(store)

//export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


