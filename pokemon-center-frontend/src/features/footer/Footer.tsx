import "./Footer.scss";
import React from "react";

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer footer-pokemon">
        <div className="container footer-container">
          <span className="text-muted footer-title">
            This is a fucking footer
          </span>
        </div>
      </footer>
    );
  }
}
