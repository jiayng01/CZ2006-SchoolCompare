

import "../ComponentsCSS/MoreInformation.css";
import React from "react";

function MoreInfoButton() {
  return (
    <button
      className="more-info-button"
      onClick={() => console.log("button clicked")}
    >
      Click here for more information
    </button>
  );
}

export default MoreInfoButton;
