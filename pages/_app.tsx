/**@lib */
import type { AppProps } from "next/app";
import wrapper from "@/wrapper";
/**@components */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
/**@styles */
import "@/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
