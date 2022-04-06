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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import mrtIcon from "../Images/mrt-icon.png";
import "../ComponentsCSS/MoreInformation.css";
import { useLocation, useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { SchoolsContext } from "../Contexts/SchoolsContext";
import react, { useContext } from "react";

const MoreInformation = () => {
  const { schoolsContext } = useContext(SchoolsContext);
  const data = schoolsContext.schools;
  //console.log("school id", props.location.state);
  const { school_name } = useParams();

  return (
    <div>
      {!data ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className="more-info-heading"> {school_name} </div>
          <div className="more-info">
            {data
              .filter(
                (value) => value.school_name.toLowerCase() === school_name
              )
              .map((props) => {
                let subjects = undefined;
                if (props.subject_desc !== undefined) {
                  subjects = [];
                  for (let i = 0; i < props.subject_desc.length; i++) {
                    if (i !== props.subject_desc.length - 1) {
                      subjects.push(
                        props.subject_desc[i].toLowerCase() + " ,  "
                      );
                    } else {
                      subjects.push(props.subject_desc[i].toLowerCase());
                    }
                  }
                }

                let moe_programme = [];
                if (props.moe_programme !== undefined) {
                  for (let i = 0; i < props.moe_programme.length; i++) {
                    if (i !== props.moe_programme.length - 1) {
                      moe_programme.push(
                        props.moe_programme[i].toLowerCase() + " ,  "
                      );
                    } else {
                      moe_programme.push(props.moe_programme[i].toLowerCase());
                    }
                  }
                }
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
                      subjects={subjects}
                      physical_sports={props.physical_sports}
                      visual_and_pa={props.visual_and_pa}
                      clubs_and_societies={props.clubs_and_societies}
                      uniformed_groups={props.uniformed_groups}
                      others={props.others}
                      moe_programme={props.moe_programme}
                      alp_domain={props.alp_domain}
                      alp_title={props.alp_title}
                      llp_domain1={props.llp_domain1}
                      llp_title1={props.llp_title1}
                      llp_domain2={props.llp_domain2}
                      llp_title2={props.llp_title2}
                    />
                  </div>
                );
              })}
          </div>
        </>
      )}
      ;
    </div>
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
  physical_sports,
  visual_and_pa,
  clubs_and_societies,
  uniformed_groups,
  others,
  moe_programme,
  alp_domain,
  alp_title,
  llp_domain1,
  llp_title1,
  llp_domain2,
  llp_title2,
}) => {
  if (!_id) return <div />;
  return (
    <div>
      <div className="school-info">
        <p className="gen-info ">General Information</p>

        <div className="school-location-mf">
          <FontAwesomeIcon
            className="fa-location-dot-icon-mf"
            icon={faLocationDot}
          />

          <span className="school-address-mf">{address + " ,"}</span>
          <div className="school-postal-mf">{"S" + postal_code}</div>
        </div>

        <div className="school-mrt-wrapper-mf">
          <FontAwesomeIcon
            className="fa-train-subway-icon"
            icon={faTrainSubway}
          />
          <img className="mrt-icon" src={mrtIcon} alt="mrt icon" />

          <div className="school-mrt-desc-mf">{mrt_desc}</div>
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
      </div>{" "}
      {/* div for subjects */}
      {subjects !== undefined && (
        <div className="subjects-card-mf">
          <div className="subjects-card-school-name-mf">
            Subjects Offered
            <div className="subjects-desc-mf">{subjects}</div>
          </div>
        </div>
      )}
      {/* div for ccas*/}
      <div className="cca-card-mf">
        {
          <div className="cca-container-mf">
            CCA Information
            {physical_sports !== undefined && (
              <div className="cca-div-mf">
                <div className="cca-category-mf">Physical Sports </div>
                <div className="cca-name-mf"> {physical_sports + ","}</div>
              </div>
            )}
            {visual_and_pa !== undefined && (
              <div className="cca-div-mf">
                <div className="cca-category-mf">Visual & Performing Arts </div>
                <div className="cca-name-mf"> {visual_and_pa + ","}</div>
              </div>
            )}
            {clubs_and_societies !== undefined && (
              <div className="cca-div-mf">
                <div className="cca-category-mf">Clubs & Societies </div>
                <div className="cca-name-mf"> {clubs_and_societies + ","} </div>
              </div>
            )}
            {uniformed_groups !== undefined && (
              <div className="cca-div-mf">
                <div className="cca-category-mf">Uniformed Groups </div>
                <div className="cca-name-mf">{uniformed_groups + ","} </div>
              </div>
            )}
            {others !== undefined && (
              <div className="cca-div-mf">
                <div className="cca-category-mf">Others </div>
                <div className="cca-name-mf"> {others + ","} </div>
              </div>
            )}
          </div>
        }
      </div>
      {/* div for elective*/}
      <div className="elective-card-mf">
        <div className="elective-container-mf">
          Electives & Programmes
          {moe_programme !== undefined && (
            <div className="elective-div-mf">
              <div className="elective-category-mf"> MOE Programme :</div>
              <div className="elective-name-mf"> {moe_programme} </div>
            </div>
          )}
          {alp_domain != "NULL" && (
            <div className="elective-div-mf">
              <div className="elective-category-mf">{alp_domain} </div>
              <div className="elective-name-mf"> {alp_title}</div>
            </div>
          )}
          {llp_domain1 != "NULL" && (
            <div className="elective-div-mf">
              <div className="elective-category-mf">{llp_domain1} </div>
              <div className="elective-name-mf"> {llp_title1} </div>
            </div>
          )}
          {llp_domain2 != "NULL" && (
            <div className="elective-div-mf">
              <div className="elective-category-mf">{llp_domain2} </div>
              <div className="elective-name-mf">{llp_title2} </div>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default MoreInformation;
