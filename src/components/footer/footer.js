import React from "react";
import Divider from "../divider/divider";
import "./footer.css";
import { Link } from "react-router-dom"
export default function PageFooter() {
  return (
    <div className="page-footer">
      <Divider />
      <div>
        <ul className="footer-list">
          <li className="footer-list-item">
            <a target="_blank" rel="noreferrer" href="https://github.com/jjuannn">
              <strong className="list-item-text">Contact</strong>
            </a>
          </li>
          <li className="footer-list-item">
            <Link to="/faq">
              <strong className="list-item-text">FAQ's</strong>
            </Link>
          </li>
          <li className="footer-list-item">
            <Link to="/tos">
              <strong className="list-item-text">Terms of service</strong>
            </Link>
          </li>
          <li className="footer-list-item">
            <a target="_blank" rel="noreferrer" href="https://github.com/jjuannn/BlogIt">
              <strong className="list-item-text">Source code</strong>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
