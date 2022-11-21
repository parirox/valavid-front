import Layout from "@/layouts/main/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout styleMode={Component?.styleMode}>
      <Component {...pageProps} />
    </Layout>
  );
}


export default MyApp;
