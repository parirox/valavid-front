import Layout from "@/layouts/main/Layout";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout styleMode={Component?.styleMode}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}


export default MyApp;
