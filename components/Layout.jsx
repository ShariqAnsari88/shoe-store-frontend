import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {

  const Component = props.component;
  return (
    <div>
      <Header />
      <Component {...props.pageProps} />
      <Footer />
    </div>
  );
}

export default Layout;

