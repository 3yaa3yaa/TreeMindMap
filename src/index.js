import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tree from './Tree';
import StateProvider from './StateProvider';
import { Provider, connect } from 'react-redux'
import {compose,createStore} from "redux";

// Connected Component
const App = connect(
    StateProvider.mapStateToProps,
    StateProvider.mapDispatchToProps
)(Tree)

function convertIntialData(givenData)
{
    if (givenData==null)
    {
        return null;
    }
    else
    {
        if(typeof(givenData)=="string")
        {
            return JSON.parse(givenData)
        }
        else
        {
            return givenData
        }
    }

}


const Map=props=>{
    const { initialState, stateHandler } = props;
    let store;
    let convertedInitialState=convertIntialData(initialState)
    if(convertedInitialState == null)
    {
        store = createStore(StateProvider.leafReducer)
    }
    else
    {
        store = createStore(StateProvider.leafReducer, convertedInitialState)
    }
    if(stateHandler!=null)
    {
        store.subscribe(()=>stateHandler(store.getState()))
    }
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
