import React from "react";
import "./nav.css";

export default function NavigationBar() {
  return (
    <header style={{ padding: "2% 15%" }}>
      <nav className="nav-container">
        <div>
          <p className="page-name">
            <a className="page-name-text" href="#">
              BlogIt!
            </a>
          </p>
        </div>
        <ul className="nav-list">
          <li className="list-item">
            <a className="nav-text" href="#">
              Posts
            </a>
          </li>
          <li className="list-item">
            <a className="nav-text" href="#">
              About
            </a>
          </li>
          <li className="list-item">
            <a className="nav-text" href="#">
              Creator
            </a>
          </li>
        </ul>
        <hr />
      </nav>
    </header>
  );
}
