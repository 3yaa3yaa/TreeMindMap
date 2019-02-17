import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import './StateProvider'
import StateProvider from "./StateProvider";

// 永続化の設定
const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, StateProvider.leafReducer)

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
export const persistor = persistStore(store);

