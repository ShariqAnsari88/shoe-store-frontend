import React from "react";
import { Analytics } from "@vercel/analytics/react";

function Layout(props) {
  const Component = props.component;
  return (
    <>
      <Component {...props.pageProps} />
      <Analytics />
    </>
  );
}

export default Layout;
