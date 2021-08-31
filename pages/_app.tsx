import type { AppProps } from "next/app";
import { Provider } from "react-redux";
/**@components */
import Layout from "../components/common/Layout";
/**@reducers */
import store from "../stores/store";
/**@styles */
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp;
