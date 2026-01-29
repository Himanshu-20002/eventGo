import { put, call, takeEvery } from 'redux-saga/effects'
import { setData, setLoading, setError } from './slice'
import { fetchApiData } from './api'
import { GET_HOME_CONTENT } from './constants';


//worker sage will be fired on GET_HOME_CONTENT action
function* fetchApiDataSage():any{
    try {
        yield put(setLoading())
        const response = yield call(fetchApiData);
        yield put(setData(response))
        
    } catch (error:any) {
        yield put(setError(error.message))
    }
}
// starts fetchApiData on each dispatch of GET_HOME_CONTENT action
// allows concurrent fetches of api data
//two api can be trigger concurrently

function* homeSaga(){
    yield takeEvery(GET_HOME_CONTENT,fetchApiDataSage)
}

export default homeSaga
