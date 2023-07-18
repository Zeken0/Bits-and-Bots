import "@/styles/globals.scss";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
