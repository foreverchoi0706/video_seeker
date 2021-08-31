import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
/**@reducers */
import test from "./reducers/test";

const root = combineReducers({
  test,
});

const middlewares: Array<any> = [];

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(root, enhancer);

export default store;
