import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme, Text } from '@nextui-org/react';
import '../styles/background.css'

const darkTheme = createTheme({type: "dark"});
const lightTheme = createTheme({type: "light"});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme = {darkTheme} >
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;