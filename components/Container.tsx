import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Container({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
