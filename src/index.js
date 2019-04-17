import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tree from './Tree';
import StateProvider from './StateProvider';
import { Provider, connect } from 'react-redux'
//import * as serviceWorker from './serviceWorker';
import {compose,createStore} from "redux";
//import { PersistGate } from 'redux-persist/integration/react'
//import store, {persistor} from './ConfigureStore'
// Store
//const store = createStore(StateProvider.leafReducer)




// Connected Component
const App = connect(
    StateProvider.mapStateToProps,
    StateProvider.mapDispatchToProps
)(Tree)


const Map=props=>{
    const { initialState, stateHandler } = props;
    let store;
    if(initialState == null)
    {
        store = createStore(StateProvider.leafReducer)
    }
    else
    {
        store = createStore(StateProvider.leafReducer, initialState)
    }
    store.subscribe(()=>stateHandler(store.getState()))
    return (

            <Provider store={store}>
                <App />
            </Provider>
    )
}

export default Map;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
