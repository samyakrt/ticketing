import React,{ useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
 
export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
      }, []);
    return <Component {...pageProps} />
}
