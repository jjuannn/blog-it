import React from "react";
import "./nav.css";

export default function NavigationBar() {
  return (
    <header style={{ padding: "2% 15%" }}>
      <nav className="nav-container">
        <div className="nav-title-container">
          <p className="page-name">
            <a className="page-name-text" href="/">
              BlogIt!
            </a>
          </p>
        </div>
        <ul className="nav-list">
          <li className="list-item">
            <strong>
            <a className="nav-text" href="/">
              Posts
            </a>
            </strong>
          </li>
          <li className="list-item">
            <strong>
            <a className="nav-text" href="/about">
              About
            </a>
            </strong>
          </li>
          <li className="list-item user-action">
            <strong>
            <a className="nav-text" href="/users/login">
              Login
            </a>
            </strong>
          </li>
          <li className="list-item user-action">
            <strong>
            <a className="nav-text" href="/users/register">
              Register
            </a>
            </strong>
          </li>
        </ul>
      </nav>
    </header>
  );
}
