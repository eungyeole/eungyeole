import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyle, ThemeProvider } from "ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eungyeole의 블로그</title>
      </Head>

      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
