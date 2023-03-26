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
import {useEffect} from "react";
import {cookies} from "next/headers";
import {getCookie} from "cookies-next";
import Router from "next/router";

function App({Component, router, ...rest}) {
    const {
        store,
        props: {
            pageProps: {session, ...pageProps},
        },
    } = wrapper.useWrappedStore(rest);

    const persistor = persistStore(store, {}, function () {
        persistor.persist();
    });

    useEffect(()=>{
        const accessToken = getCookie("valavid_token");
        if (Component.auth && !accessToken) {
            Router.push("/auth");
        }
    },[])

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
                    <meta name="theme-color" content="#00101C"/>
                    <meta name="msapplication-navbutton-color" content="#00101C"/>
                    <meta name="apple-mobile-web-app-status-bar-style"
                          content="#00101C"/>
                </Head>
                <Toaster/>
                <NextNProgress options={{
                    showSpinner:false
                }} color="#534CDA"/>
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
