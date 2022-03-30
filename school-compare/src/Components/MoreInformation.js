

// import "../ComponentsCSS/MoreInformation.css";
// import React from "react";

// function MoreInfoButton() {
//   return (
//     <button
//       className="more-info-button"
//       onClick={() => console.log("button clicked")}
//     >
//       Click here for more information 
//     </button>
//   );
// }

// export default MoreInfoButton;


import data from "../JSON/combined_data.json";
import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import mrtIcon from "../Images/mrt-icon.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../ComponentsCSS/MoreInformation.css";
import { useLocation, useParams } from "react-router-dom";

const MoreInformation = () => {
  //console.log("school id", props.location.state);
  const {school_name} = useParams();
  //console.log({id})
  return (
    <>
    <div className="more-info-heading"> More Details</div>
      <div className="more-info"> 
        {data
        .filter((value)=>(
          value.school_name === `${school_name}`
        ))
        .map((props) => {
          return (
            <div key={props._id}>
              <MoreInfo
                key={props._id}
                _id={props._id}
                school_name={props.school_name}
                email_address={props.email_address}
                address={props.address}
                postal_code={props.postal_code}
                mrt_desc={props.mrt_desc}
                telephone_no={props.telephone_no}
                bus_desc={props.bus_desc}
              />
            </div>
          );
       })}
      </div>
      </>
      ); 
};

const MoreInfo = ({
  _id,
  school_name,
  address,
  postal_code,
  email_address,
  mrt_desc,
  telephone_no,
  bus_desc,
}) => {
 if (!_id) return <div />;
  return (
    <div className="school-info">
      <p className="school-name">{school_name}</p>

      <div className="school-location">
        <FontAwesomeIcon
          className="fa-location-dot-icon"
          icon={faLocationDot}
        />

        <span className="school-address">{address + " ,"}</span>
        <div className="school-postal">{"S" + postal_code}</div>
      </div>

      <div className="school-mrt-wrapper">
        <FontAwesomeIcon
          className="fa-train-subway-icon"
          icon={faTrainSubway}
        />
        <img className="mrt-icon" src={mrtIcon} alt="mrt icon" />

        <div className="school-mrt-desc">{mrt_desc}</div>
      </div>

      <div className="school-bus-wrapper">
        <br />
        <FontAwesomeIcon className="fa-bus-icon" icon={faBus} />
        <span className="school-bus-desc"> {bus_desc}</span>
      </div>

      <div className="school-email-address">
        <span className="email-address">
          {" "}
          <br />
          <b>Email: </b> {email_address}
        </span>
      </div>

      <div className="school-tele">
        <b>Telephone: </b>
        {telephone_no}
      </div>
    </div>
  );
};

export default MoreInformation;
