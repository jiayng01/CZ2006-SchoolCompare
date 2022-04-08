import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import mrtIcon from "../Images/mrt-icon.png";
import "../ComponentsCSS/SchoolsList2.css";
import { useParams } from "react-router-dom";

import { SchoolsContext } from "../Contexts/SchoolsContext";
import CompareContext from "../Contexts/CompareContext";

import { useContext } from "react";

const SchoolsList2 = ({ schools }) => {
  const { schoolsContext } = useContext(SchoolsContext);
  const data = schoolsContext.schools;
  const { school_name } = useParams();
  const compareCtx = useContext(CompareContext);

  return (
    <div className="school-compare">
      <div className="school-compare-list">
        <div key={schools._id}>
          <SchoolsCompInfo
            key={schools._id}
            name={schools.school_name}
            _id={schools._id}
            school_name={schools.school_name}
            email_address={schools.email_address}
            address={schools.address}
            postal_code={schools.postal_code}
            mrt_desc={schools.mrt_desc}
            telephone_no={schools.telephone_no}
            bus_desc={schools.bus_desc}
            principal_name={schools.principal_name}
            url_address={schools.url_address}
            subjects={schools.subjects}
            physical_sports={schools.physical_sports}
            visual_and_pa={schools.visual_and_pa}
            clubs_and_societies={schools.clubs_and_societies}
            uniformed_groups={schools.uniformed_groups}
            others={schools.others}
            moe_programme={schools.moe_programme}
            alp_domain={schools.alp_domain}
            alp_title={schools.alp_title}
            llp_domain1={schools.llp_domain1}
            llp_title1={schools.llp_title1}
            llp_domain2={schools.llp_domain2}
            llp_title2={schools.llp_title2}
          />
        </div>
      </div>
    </div>
  );
};

const SchoolsCompInfo = ({
  _id,
  name,
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
      {" "}
      {name}
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
            <a href={url_address} target="_blank">
              Visit the School Page{" "}
            </a>
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

export default SchoolsList2;
