import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';

import { InitTheme } from '../styles/Theme';

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="hyeji's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={InitTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
};

export default App;
