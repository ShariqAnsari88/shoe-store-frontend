import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ComingSoon } from "@/pages";

function Layout(props) {
  const Component = props.component;

  const isReleased = process.env.IS_REALEASED
  return (
    <div>
      {isReleased === 'true' ? (
        <>
          <Header />
          <Component {...props.pageProps} />
          <Footer />
        </>
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}

export default Layout;
