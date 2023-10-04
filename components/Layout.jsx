import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

function Layout(props) {
  const Component = props.component;

  const { query } = useRouter();
  const isReleased = query.released;

  return (
    <div>
      <Component {...props.pageProps} />
    </div>
  );
}

export default Layout;
