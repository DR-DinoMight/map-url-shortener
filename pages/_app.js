import { useEffect } from 'react';
import '../styles/global.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

    useEffect(() => {
        if("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
             navigator.serviceWorker.register("/sw.js").then(
                function (registration) {
                  console.log("Service Worker registration successful with scope: ", registration.scope);
                },
                function (err) {
                  console.log("Service Worker registration failed: ", err);
                }
              );
            });
          }
    }, [])

    return <Component {...pageProps} />;
}
