import React from "react";
import "./index.css";
import StateProvider from "./StateProvider";
import { Provider, connect } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import Deserializer from "./Deserializer";
import MainWindow from "./MainWindow";
import PropTypes from "prop-types";
import Leaf from "./Leaf";

// Connected Component
const App = connect(
  StateProvider.mapStateToProps,
  StateProvider.mapDispatchToProps
)(MainWindow);

export const Map = (props) => {
  const { initialState, stateHandler, middleware } = props;
  let store;
  let deserializer = new Deserializer(initialState);
  let convertedInitialState = deserializer.data;

  const finalCreateStore = middleware
    ? compose(applyMiddleware(middleware))(createStore)
    : createStore;

  if (convertedInitialState == null) {
    // store = createStore(StateProvider.leafReducer)
    store = finalCreateStore(StateProvider.leafReducer);
  } else {
    // store = createStore(StateProvider.leafReducer, convertedInitialState)
    store = finalCreateStore(StateProvider.leafReducer, convertedInitialState);
  }
  if (stateHandler != null) {
    store.subscribe(() => stateHandler(store.getState()));
  }
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export function Render(
  initialState,
  stateHandler,
  elementId,
  ReactDOM,
  middleware
) {
  ReactDOM.render(
    <Map
      initialState={initialState}
      stateHandler={stateHandler}
      middleware={{ middleware }}
    />,
    document.getElementById(elementId)
  );
}

Map.propTypes = {
  initialState: PropTypes.object,
  stateHandler: PropTypes.func,
  middleware: PropTypes.func,
};
