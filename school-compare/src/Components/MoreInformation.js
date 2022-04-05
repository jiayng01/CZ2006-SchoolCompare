

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


//import data from "../JSON/combined_data.json";
import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import mrtIcon from "../Images/mrt-icon.png";
import "../ComponentsCSS/MoreInformation.css";
import { useLocation, useParams } from "react-router-dom";

import { SchoolsContext } from "../Contexts/SchoolsContext";
import { useContext } from "react";

 

const MoreInformation = () => {
   const { schoolsContext } = useContext(SchoolsContext);
   let data = schoolsContext.schools;
  //console.log("school id", props.location.state);
  const { school_name } = useParams();
  //console.log({id})
  return (
    <>
      <div className="more-info-heading"> {school_name} </div>
      <div className="more-info">
        {data
          .filter((value) => value.school_name === `${school_name}`)
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
                  principal_name={props.principal_name}
                  url_address={props.url_address}
                  subjects={props.subject_desc}
                  physical_sports={props.physical_sports} visual_and_pa={props.visual_and_pa} clubs_and_societies={props.clubs_and_societies} uniformed_groups={props.uniformed_groups} others={props.others}
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
  address,
  postal_code,
  email_address,
  mrt_desc,
  telephone_no,
  bus_desc,
  principal_name,
  url_address,
  subjects,
  physical_sports,visual_and_pa,clubs_and_societies,uniformed_groups,others,
  moe_programme, alp_domain, alp_title, llp_domain1, llp_title1, llp_domain2, llp_title2
}) => {
  if (!_id) return <div />;
  return (
    <div>
      <div className="school-info">
        <p className="gen-info ">General Information</p>

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
          <FontAwesomeIcon className="fa-bus-icon" icon={faBus} />
          <span className="school-bus-desc"> {bus_desc}</span>
        </div>

        <div className="school-email-address">
          <span className="email-address">
            <br />
            <b>Email: </b> {email_address}
          </span>
        </div>

        <div className="school-tele">
          <b>Telephone: </b>
          {telephone_no}
        </div>

        <div className="principal">
          <br />
          <b> Principal: </b>
          {principal_name}
        </div>

        <div className="website">
          <b>
            <a href={url_address}>Visit the School Page </a>
          </b>
        </div>
      </div> {/* div for general info */}

      <div className="subjects-card">
      <p className="subjects-card-school-name"> Subjects Offered
      <div className="subjects-desc">{subjects}</div></p>
    </div>{/* div for subjects*/ }

      <div className="cca-card">
        {
          <div className="cca-container">
            CCA Information 
            {
              <div className="cca-div">
                <div className="cca-category">Physical Sports </div>
                <div className="cca-name"> {physical_sports + ","}</div>
              </div>
            }
            {
              <div className="cca-div">
                <div className="cca-category">Visual & Performing Arts </div>
                <div className="cca-name"> {visual_and_pa + ","}</div>
              </div>
            }
            {
              <div className="cca-div">
                <div className="cca-category">Clubs & Societies </div>
                <div className="cca-name"> {clubs_and_societies + ","} </div>
              </div>
            }
            {
              <div className="cca-div">
                <div className="cca-category">Uniformed Groups </div>
                <div className="cca-name">{uniformed_groups + ","} </div>
              </div>
            }
            {
              <div className="cca-div">
                <div className="cca-category">Others </div>
                <div className="cca-name"> {others + ","} </div>
              </div>
            }
          </div>
        }
      </div> {/* div for cca*/}

      <div className="elective-card">
      <div className="elective-container">
      MOE Programme 
        {
          <div className="elective-div">
            <div className="elective-category"> </div>
            <div className="elective-name"> {moe_programme} </div>
          </div>
        }
        {
          <div className="elective-div">
            <div className="elective-category">{alp_domain} </div>
            <div className="elective-name"> {alp_title}</div>
          </div>
        }
        {
          <div className="elective-div">
            <div className="elective-category">{llp_domain1} </div>
            <div className="elective-name"> {llp_title1} </div>
          </div>
        }
        {
          <div className="elective-div">
            <div className="elective-category">{llp_domain2} </div>
            <div className="elective-name">{llp_title2} </div>
          </div>
        }
      </div>
    </div> {/*div for electives*/}
</div>
  );
};

export default MoreInformation;
