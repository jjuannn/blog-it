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
            <Link target="_blank" rel="noreferrer" href="https://github.com/jjuannn">
              <strong className="list-item-text">Contact</strong>
            </Link>
          </li>
          <li className="footer-list-item">
            <Link href="/faq">
              <strong className="list-item-text">FAQ's</strong>
            </Link>
          </li>
          <li className="footer-list-item">
            <Link href="/tos">
              <strong className="list-item-text">Terms of service</strong>
            </Link>
          </li>
          <li className="footer-list-item">
            <Link target="_blank" rel="noreferrer" href="https://github.com/jjuannn/BlogIt">
              <strong className="list-item-text">Source code</strong>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
