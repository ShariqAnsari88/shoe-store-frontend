import React from "react";

function Layout(props) {
  const Component = props.component;
  return (
    <div>
      <Component {...props.pageProps} />
    </div>
  );
}

export default Layout;
