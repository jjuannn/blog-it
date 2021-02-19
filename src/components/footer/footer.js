import React from "react";
import Divider from "../divider/divider";
import "./footer.css";
export default function PageFooter() {
  return (
    <>
      <Divider />
      <div className="page-footer">
        <ul className="footer-list">
          <li className="footer-list-item">
            <a href="#">
              <strong className="list-item-text">Contact</strong>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="#">
              <strong className="list-item-text">FAQ's</strong>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="#">
              <strong className="list-item-text">Terms of service</strong>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="#">
              <strong className="list-item-text">Source code</strong>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
