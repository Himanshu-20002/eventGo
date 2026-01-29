import {MMKV} from 'react-native-mmkv'

const storage = new MMKV()

const reduxStorage = {
    setItem: (key:string,value:any) => {  //setItem is a function that takes a key and a value and returns a promise
        storage.set(key,value)
        return Promise.resolve(true)
    },
    getItem: (key:string) => {
        const value = storage.getString(key)
        return Promise.resolve(value)
    },
    removeItem: (key:string) => {
        storage.delete(key)
        return Promise.resolve(true)
    },
  
}

export default reduxStorage