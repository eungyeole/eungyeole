import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyle, ThemeProvider } from "ui";
import { Analytics } from "@vercel/analytics/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: 0,
            retry: 0,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>eungyeole의 블로그</title>
      </Head>

      <Analytics />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydrateState}>
          <ThemeProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
