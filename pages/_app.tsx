import type { AppProps } from "next/app";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

/**@components */
import Layout from "../components/common/Layout";
/**@reducers */
import root from "../reducers/root";
/**@styles */
import "../styles/globals.css";

// const configureStore = () => {
//   const middlewares: Array<any> = [];
//   const enhancer =
//     process.env.NODE_ENV === "production"
//       ? compose(applyMiddleware(...middlewares))
//       : composeWithDevTools(applyMiddleware(...middlewares));
//   const store = createStore(root, enhancer);
//   return store;
// };

// create a makeStore function
const makeStore = (context: Context) => createStore(root);

// export an assembled wrapper
export const wrapper = createWrapper<Store<any>>(makeStore, { debug: true });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
