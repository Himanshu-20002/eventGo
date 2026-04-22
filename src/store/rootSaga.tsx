import { all, fork } from 'redux-saga/effects'
import homeSaga from '../modules/home/api/saga'
import aiAssistantSaga from '../sagas/aiAssistantSaga'

export default function* rootSaga() {
    yield all([
        fork(homeSaga),
        fork(aiAssistantSaga)
    ])
}