import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tree from './Tree';
import StateProvider from './StateProvider';
import { Provider, connect } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import {compose,createStore} from "redux";
import { PersistGate } from 'redux-persist/integration/react'

import store, {persistor} from './ConfigureStore'
// Store
//const store = createStore(StateProvider.leafReducer)


// Connected Component
const App = connect(
    StateProvider.mapStateToProps,
    StateProvider.mapDispatchToProps
)(Tree)


//ReactDOM.render(<Tree />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
