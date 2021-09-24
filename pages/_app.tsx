import type { AppProps } from "next/app";
import { applyMiddleware, createStore, Store } from "redux";
import { createWrapper, Context } from "next-redux-wrapper";
import thunk from "redux-thunk";
/**@components */
import Layout from "../components/common/Layout";
/**@reducers */
import root from "../reducers/root";
/**@styles */
import "../styles/globals.css";
import wrapper2 from "../reducers/store";

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

export default wrapper2.withRedux(MyApp);
