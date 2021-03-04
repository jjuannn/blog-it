import React from "react";
import useUser from "../../hooks/useUser"
import "./nav.css";
import { Link } from "react-router-dom"

export default function NavigationBar() {
  const { isLogged, logout, data } = useUser()
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
          { isLogged ? 
          <>
          <li className="list-item">
            <strong>
              <p className="nav-text" onClick={logout}>Logout</p>
            </strong>
          </li>
          <li className="user-name">
            <strong>
              <p className="nav-text">{data.username}</p>
            </strong>
          </li>
          </> : <>
          <li className="list-item">
            <strong>
            <Link className="nav-text" to="/users/login">
              Login
            </Link>
            </strong>
          </li>
          <li className="list-item">
            <strong>
            <Link className="nav-text" to="/users/register">
              Register
            </Link>
            </strong>
          </li>
          </>}
        </ul>
      </nav>
    </header>
  );
}
