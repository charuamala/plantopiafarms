import type { AppProps } from "next/app";
import "../src/styles.css";
import "../src/styles-header-options.css";
import Layout from "../src/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
