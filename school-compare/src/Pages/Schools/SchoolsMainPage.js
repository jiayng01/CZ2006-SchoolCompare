import React from "react";
import { NavLink } from "react-router-dom";
import "../../PagesCSS/Schools/SchoolsMainPage.css";

let activeStyle = {
  color: "#80De80",
  transition: "all 0.2s linear",
};

function SchoolsMainPage() {
  return (
    <div className="schools-main-container">
      <p className="schools-main-title">Select an education level!</p>

      {/* Primary */}
      <li className="schools-main-list">
        <NavLink
          className="schools-main-items primary"
          to="/schools/primary"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Primary
        </NavLink>
      </li>
      {/* Secondary */}
      <li className="schools-main-list">
        <NavLink
          className="schools-main-items secondary"
          to="/schools/secondary"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Secondary
        </NavLink>
      </li>
      {/* Tertiary */}
      <li className="schools-main-list">
        <NavLink
          className="schools-main-items tertiary"
          to="/schools/tertiary"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Tertiary
        </NavLink>
      </li>
    </div>
  );
}

export default SchoolsMainPage;
