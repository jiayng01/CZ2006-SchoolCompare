import "../ComponentsCSS/CompareButton.css";
import React from "react";

function CompareButton() {
  return (
    <button
      className="compare-button"
      onClick={() => console.log("button clicked")}
    >
      Compare
    </button>
  );
}

export default CompareButton;
