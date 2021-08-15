import 'tailwindcss/tailwind.css'
import "../styles/index.css"
import { Router } from "next/dist/client/router"
import nProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => {
  nProgress.start();
  nProgress.set(0.2);
  //nProgress.configure({ parent: '#containerApp' })
});

Router.events.on("routeChangeComplete", () => {
  nProgress.done();
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
