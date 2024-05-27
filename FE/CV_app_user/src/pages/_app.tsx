// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { EmotionCache } from '@emotion/react';

import { useApollo, MuiProvider, createEmotionCache } from '@/core';
import { isBrowser } from '@/helpers';
import { useAnalytics, useNProgress } from '@/shared';
import { asyncProcessAuth } from '../store';
import Layout from '../layouts';
import store from '../store/configureStore';
import '../assets/styles/app.scss';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Check authenticate
if (isBrowser()) {
  store.dispatch(asyncProcessAuth());
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const WebApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  useAnalytics();
  useNProgress();

  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <MuiProvider emotionCache={emotionCache}>
        <ApolloProvider client={apolloClient}>
          <Layout component={Component}>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </MuiProvider>
    </Provider>
  );
};

export default WebApp;
