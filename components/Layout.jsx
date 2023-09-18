import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  const Component = props.component;

  const isReleased = process.env.IS_RELEASED === 'true';

  return (
    <div>
      {isReleased && <Header />}
      <Component {...props.pageProps} />
      {isReleased && <Footer />}
    </div>
  );
}

export default Layout;
