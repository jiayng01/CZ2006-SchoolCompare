import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../ComponentsCSS/SubjectsCard.css";
import "../ComponentsCSS/CutOffCard.css";

import { useContext } from "react"; // allows us to establish connection btwn this component and the Favourites context
import FavouritesContext from "../Contexts/FavouritesContext";

import MoreInfoButton from "./MoreInfoButton";

function CutOffCard(props) {
  const level = props.level;
  props.data.name = props.data.name.toLowerCase();

  const favouritesCtx = useContext(FavouritesContext);
  const itemIsFavourite = favouritesCtx.itemIsFavourite(props.data._id);

  function toggleFavouriteStatusHandler() {
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(props.data._id);
    } else {
      favouritesCtx.addFavourite(props.data);
    }
  }
  console.log(props.data.name);

  if (level === "Secondary") {
    return (
      <div className="school-card cut-off-card">
        <p className="school-name">
          {props.data.name}
          <FontAwesomeIcon
            className={
              !itemIsFavourite ? "fa-heart-icon" : "fa-heart-icon-toggled"
            }
            icon={faHeart}
            onClick={toggleFavouriteStatusHandler}
          ></FontAwesomeIcon>
        </p>
        <div className="cut-off-container">
          <div>
            <span className="cut-off-entry">Express</span> :{" "}
            {props.data.express}
          </div>
          <div>
            <span className="cut-off-entry">Normal Academic (NA)</span> :{" "}
            {props.data.na}
          </div>
          <div>
            <span className="cut-off-entry">Normal Technical (NT)</span> :
            {props.data.nt}
          </div>
        </div>
        <div className="container">
          <label className="compare-btn-form-control">
            click to compare
            <input type="checkbox" className="compare-btn"></input>
          </label>
        </div>

        <MoreInfoButton />
      </div>
    );
  }
  else if (level === "Tertiary" ){
    return (
        <div className="school-card cut-off-card">
          <p className="school-name">
            {props.data.name}
            <FontAwesomeIcon
              className={
                !itemIsFavourite ? "fa-heart-icon" : "fa-heart-icon-toggled"
              }
              icon={faHeart}
              onClick={toggleFavouriteStatusHandler}
            ></FontAwesomeIcon>
          </p>
          <div className="cut-off-container">
            <div>
              <span className="cut-off-entry">Arts</span> :{" "}
              {props.data.arts}
            </div>
            <div>
              <span className="cut-off-entry">Science</span> :{" "}
              {props.data.science}
            </div>

          </div>
          <div className="container">
            <label className="compare-btn-form-control">
              click to compare
              <input type="checkbox" className="compare-btn"></input>
            </label>
          </div>
  
          <MoreInfoButton />
        </div>
      );
  }
}

export default CutOffCard;
