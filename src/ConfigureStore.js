import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import './StateProvider'
import StateProvider from "./StateProvider";

let re= new RegExp('key=(.*?)(&|$)')
let param=window.location.search
let keystring='root'
if(re.test(param))
{
    keystring=param.match(re)[1]
}
//let keystring = window.location.search.match(/key=(.*?)(&|$)/)[1]

// 永続化の設定
const persistConfig = {
    //key: 'root',
    key: keystring,
    storage,
}


const persistedReducer = persistReducer(persistConfig, StateProvider.leafReducer)

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
export const persistor = persistStore(store);

