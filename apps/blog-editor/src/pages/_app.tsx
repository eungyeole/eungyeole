import { AppContext, AppProps } from "next/app";
import { GlobalStyle, ThemeProvider, ToastProvider } from "ui";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { apiClient } from "src/apis/client";
import { getCookie } from "cookies-next";
import { COOKIE_KEYS } from "src/constants/cookies";

type MyAppComponent = AppProps["Component"] & {
  requireAuth: boolean;
};

interface MyAppProps extends AppProps {
  Component: MyAppComponent;
}

function MyApp({ Component, pageProps }: MyAppProps) {
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
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <ThemeProvider>
          <GlobalStyle />
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const _Component = Component as MyAppComponent;
  const appProps = await _Component.getInitialProps?.(ctx);

  const requireAuth = _Component.requireAuth;

  if (requireAuth) {
    const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN, ctx);

    if (!accessToken) {
      ctx.res?.writeHead(302, {
        Location: `/auth/signin?redirectPath=${ctx.asPath}`,
      });
      ctx.res?.end();
    }

    apiClient.instance.defaults.headers[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  return {
    pageProps: {
      ...appProps,
    },
  };
};
