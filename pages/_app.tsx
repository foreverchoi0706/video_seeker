import type { AppProps } from "next/app";
import wrapper from "../wrapper";
/**@components */
import Layout from "../components/common/Layout";
/**@styles */
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
