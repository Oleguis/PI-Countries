import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

import reduxDevTools from './enhancers.js';

const store = createStore(
	rootReducer,
	undefined,
	compose(applyMiddleware(thunk),reduxDevTools)
);

export default store;
