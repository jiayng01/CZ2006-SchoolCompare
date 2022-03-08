// This component will display the name, Location and MRT location of the school in a card

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../ComponentsCSS/SchoolsCard.css";


function SchoolsCard(props) {
  props.data.school_name = props.data.school_name.toLowerCase();
  props.data.address = props.data.address.toLowerCase();
  props.data.mrt_desc = props.data.mrt_desc.toLowerCase();

  return (
    <div className="school-card">
      <p className="school-name">
        {props.data.school_name}
        <FontAwesomeIcon className="fa-heart-icon" icon={faHeart} />
      </p>

      <div className="school-location">
        <FontAwesomeIcon
          className="fa-location-dot-icon"
          icon={faLocationDot}
        />

        <span className="school-address">{props.data.address}</span>
        <div className="school-postal">{props.data.postal_code}</div>
      </div>

      <div className="school-mrt-wrapper">
        <div>
          <FontAwesomeIcon
            className="fa-train-subway-icon"
            icon={faTrainSubway}
          />
        </div>

        <div className="school-mrt-desc">{props.data.mrt_desc}</div>
      </div>

      <div className="container">
        <label className="compare-btn-form-control">
          click to compare
          <input type="checkbox" className="compare-btn"></input>
          
        </label>
      </div>
    </div>
  );
}

export default SchoolsCard;
