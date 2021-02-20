import React from "react";
import Divider from "../divider/divider";
import "./footer.css";
export default function PageFooter() {
  return (
    <div className="page-footer">
      <Divider />
      <div>
        <ul className="footer-list">
          <li className="footer-list-item">
            <a target="_blank" href="https://github.com/jjuannn">
              <strong className="list-item-text">Contact</strong>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="/faq">
              <strong className="list-item-text">FAQ's</strong>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="/tos">
              <strong className="list-item-text">Terms of service</strong>
            </a>
          </li>
          <li className="footer-list-item">
            <a target="_blank" href="https://github.com/jjuannn/BlogIt">
              <strong className="list-item-text">Source code</strong>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
