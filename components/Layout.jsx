import React from "react";
import { Analytics } from "@vercel/analytics/react";

function Layout(props) {
  const Component = props.component;
  return (
    <div>
      <Component {...props.pageProps} />
      {process.env.NODE_ENV !== "development" && <Analytics />}
    </div>
  );
}

export default Layout;
