import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../ComponentsCSS/SubjectsCard.css";

import { useContext } from "react"; // allows us to establish connection btwn this component and the Favourites context
import FavouritesContext from "../Contexts/FavouritesContext";

function SubjectsCard(props) {
  props.data.school_name = props.data.school_name.toLowerCase();
  props.data.subject_desc = props.data.subject_desc.toLowerCase();

  const favouritesCtx = useContext(FavouritesContext);
  const itemIsFavourite = favouritesCtx.itemIsFavourite(props.data._id);

  function toggleFavouriteStatusHandler() {
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(props.data._id);
    } else {
      favouritesCtx.addFavourite(props.data);
    }
  }

  
  return (
    <div className="school-card">
      <p className="school-name">
        {props.data.school_name}
        <FontAwesomeIcon
          className={
            !itemIsFavourite ? "fa-heart-icon" : "fa-heart-icon-toggled"
          }
          icon={faHeart}
          onClick={toggleFavouriteStatusHandler}
        ></FontAwesomeIcon>
      </p>
      <div>
          {props.data.subject_desc}
      </div>

    </div>
  );
}

export default SubjectsCard;
