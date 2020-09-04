import React from "react";
import { Header } from "../features/header/Header";
import { Footer } from "../features/footer/Footer";

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
