import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fa">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body
          dir="rtl"
          className="font-sans font-normal leading-relaxed text-white font-base"
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
