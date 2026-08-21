import Head from "next/head";
import { ReactNode } from "react";
import HeaderOption1TwoTier from "./HeaderOption1TwoTier";
import Footer from "./Footer";

const SITE_URL = "https://plantopiafarms.com";
const DEFAULT_TITLE = "Plantopia Farms — Farm-fresh berries, delivered";
const DEFAULT_DESCRIPTION =
  "Premium strawberries, blueberries, blackberries, and raspberries grown with care in Kotagiri and delivered straight to your table.";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Plantopia Farms" />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_IMAGE} />
      </Head>
      <HeaderOption1TwoTier />
      {children}
      <Footer />
    </>
  );
}
