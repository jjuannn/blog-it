import React from "react";
import "./nav.css";
import { Link } from "react-router-dom"
export default function NavigationBar() {
  return (
    <header style={{ padding: "2% 15%" }}>
      <nav className="nav-container">
        <div className="nav-title-container">
          <p className="page-name">
            <Link className="page-name-text" to="/">
              BlogIt!
            </Link>
          </p>
        </div>
        <ul className="nav-list">
          <li className="list-item">
            <strong>
            <Link className="nav-text" to="/">
              Posts
            </Link>
            </strong>
          </li>
          <li className="list-item">
            <strong>
            <Link className="nav-text" to="/about">
              About
            </Link>
            </strong>
          </li>
          <li className="list-item user-action">
            <strong>
            <Link className="nav-text" to="/users/login">
              Login
            </Link>
            </strong>
          </li>
          <li className="list-item user-action">
            <strong>
            <Link className="nav-text" to="/users/register">
              Register
            </Link>
            </strong>
          </li>
        </ul>
      </nav>
    </header>
  );
}
