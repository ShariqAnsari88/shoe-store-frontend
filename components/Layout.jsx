import React from "react";

function Layout(props) {
  const Component = props.component;
  return (
      <Component {...props.pageProps} />
  );
}

export default Layout;
