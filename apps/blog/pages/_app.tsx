import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyle, ThemeProvider } from "ui";
import { Analytics } from "@vercel/analytics/react";
import "../assets/fonts.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eungyeole의 블로그</title>
      </Head>

      <Analytics />
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
