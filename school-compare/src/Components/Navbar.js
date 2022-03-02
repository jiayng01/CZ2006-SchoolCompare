import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../ComponentsCSS/Navbar.css";

import { NavLink } from "react-router-dom";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

// Change the inline-style on selecting the respective tabs
let activeStyle = {
  color: "#80De80",
  transition: "all 0.2s linear",
};

function Navbar() {
  const [expandNavBar, setExpandNavBar] = useState(false);

  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <div className="fa-book-icon">
          <FontAwesomeIcon className="fa-book-icon" icon={faBookOpen} />
          SchoolCompare
        </div>
        <div className="navbar-headers">
          {/* To Home page */}
          <li className="navbar-list">
            <NavLink
              className="navbar-items"
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Home
            </NavLink>
          </li>

          {/* To Schools page */}
          <li className="navbar-list">
            <NavLink
              className="navbar-items"
              to="/schools"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Schools
            </NavLink>
          </li>

          {/* To Favourites page */}
          <li className="navbar-list">
            <NavLink
              className="navbar-items"
              to="/favourites"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Favourites
            </NavLink>
          </li>

          {/* To Forum page */}
          <li className="navbar-list">
            <NavLink
              className="navbar-items"
              to="/forum"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Forum
            </NavLink>
          </li>

          {/* To Feedback page */}
          <li className="navbar-list">
            <NavLink
              className="navbar-items"
              to="/feedback"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Feedback
            </NavLink>
          </li>
        </div>

        {/* To Login page */}
        <li className="navbar-list login-button">
          <NavLink
            className="navbar-items login-button"
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Log in
          </NavLink>
        </li>

        <div
          className="hamburger-menu"
          onClick={() => {
            setExpandNavBar((currentValue) => !currentValue);
          }}
        >
          {expandNavBar ? (
            <>
              <FontAwesomeIcon className="fa-cross-icon"icon={faXmark} color="#fff" />
              <nav className="navbar-mobile">
                <ul className="navbar-ul-mobile">
                  {/* To Home page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  {/* To Schools page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/schools"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Schools
                    </NavLink>
                  </li>

                  {/* To Favourites page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/favourites"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Favourites
                    </NavLink>
                  </li>

                  {/* To Forum page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/forum"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Forum
                    </NavLink>
                  </li>

                  {/* To Feedback page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/feedback"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Feedback
                    </NavLink>
                  </li>

                  {/* To Login page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/login"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Log in
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faBars} color="#fff" />
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
