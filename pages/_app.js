import Layout from "@/layouts/main/Layout";
import Head from "next/head";
import "../styles/globals.css";
import {wrapper} from "@/datasources/store";
import {PersistGate} from "redux-persist/integration/react";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import {SessionProvider} from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';

function App({Component, ...rest}) {
  const {
    store,
    props: {
      pageProps: { session, ...pageProps },
    },
  } = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {() => (
          <Layout styleMode={Component?.styleMode}>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <Toaster/>
            <NextNProgress color="#534CDA"/>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </Layout>
        )}
      </PersistGate>
    </Provider>
  );
}

export default App
