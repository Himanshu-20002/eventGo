import {GET_CATEGORIES} from  './constants'

export const getCategories = ()=>{
    // page:number
    return {
        type: 'GET_CATEGORIES',
        // payload: {
        //     page
        // }
    }
}