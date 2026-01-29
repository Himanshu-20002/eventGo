import { all, fork } from 'redux-saga/effects'
import homeSaga from '../modules/home/api/saga'
import categoriesSaga from '@modules/categories/api/saga'

export default function* rootSaga(){
    yield all([
        fork(homeSaga),
        fork(categoriesSaga)
        
    ])
}