import type { AppProps } from "next/app";
import "../src/styles.css";
import AdminLayout from "../src/components/AdminLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}
