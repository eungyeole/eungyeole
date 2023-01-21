import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyle, ThemeProvider } from "ui";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eungyeole.cdn</title>
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