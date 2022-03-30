import React from "react";
import { createContext, useState } from "react";
import axios from "axios";

const setUp = () => {
  let combined = {
    fax_no: "63627512",
    gifted_ind: "No",
    mothertongue3_code: "Tamil",
    fifth_vp_name: "NULL",
    postal_code: "738907",
    type_code: "GOVERNMENT SCHOOL",
    second_vp_name: "MDM NUR SABARIAH BTE MOHD IBRAHIM",
    first_vp_name: "MDM CHUA MUI LING",
    mainlevel_code: "PRIMARY",
    email_address: "ADMIRALTY_PS@MOE.EDU.SG",
    sap_ind: "No",
    telephone_no_2: "na",
    mrt_desc: "Admiralty Station",
    bus_desc: "TIBS 965, 964, 913",
    third_vp_name: "NULL",
    telephone_no: "63620598",
    ip_ind: "No",
    principal_name: "MR PEK WEE HAUR",
    mothertongue1_code: "Chinese",
    nature_code: "CO-ED SCHOOL",
    fourth_vp_name: "NULL",
    autonomous_ind: "No",
    session_code: "FULL DAY",
    school_name: "ADMIRALTY PRIMARY SCHOOL",
    dgp_code: "WOODLANDS",
    address: "11   WOODLANDS CIRCLE",
    sixth_vp_name: "NULL",
    mothertongue2_code: "Malay",
    fax_no_2: "na",
    zone_code: "NORTH",
    _id: 1,
    url_address: "https://admiraltypri.moe.edu.sg/",
    subject_desc: [
      "ART",
      "CHINESE",
      "ENGLISH LANGUAGE",
      "FOUNDATION CHINESE",
      "HIGHER CHINESE",
      "HIGHER MALAY",
      "HIGHER TAMIL",
      "MALAY",
      "MATHEMATICS",
      "MUSIC",
      "PHYSICAL EDUCATION",
      "SCIENCE",
      "SOCIAL STUDIES",
      "TAMIL",
    ],
    physical_sports: [
      "MODULAR CCA (SPORTS)",
      "FOOTBALL",
      "TRACK AND FIELD",
      "WUSHU",
      "ROPE SKIPPING",
    ],
    visual_and_pa: [
      "ART AND CRAFTS",
      "CHOIR",
      "GUITAR ENSEMBLE",
      "CHINESE DANCE",
      "INDIAN DANCE",
      "MALAY DANCE",
      "PHOTOGRAPHY",
    ],
    clubs_and_societies: [
      "ENGLISH LANGUAGE, DRAMA AND DEBATING",
      "INFOCOMM TECHNOLOGY (COMPUTING)",
      "DESIGN AND INNOVATION",
      "ENVIRONMENTAL SCIENCE",
    ],
    uniformed_groups: ["SCOUTS", "GIRL GUIDES (BROWNIES)"],
    others: [],
    moe_programme: [],
    alp_domain: ["STEM"],
    alp_title: ["Design Thinking for Sustainability (DTS @ Admiralty)"],
    llp_domain1: ["Community Service & Student Leadership"],
    llp_title1: ["High Performance Mind-set for Personal Leadership"],
    llp_domain2: ["NULL"],
    llp_title2: ["NULL"],
  };
};

const SchoolsContext = createContext({
  schools: setUp(),
  addSchool: (school) => {},
}); //context is a javascript object
export function SchoolsContextProvider(props) {
  const [schools, setSchools] = useState([]);

  function addSchoolHandler(school) {
    setSchools((currentSchools) => {
      return currentSchools.push(school);
    });
  }

  const context = {
    schools: schools,
    totalSchools: schools.length,
    addSchool: addSchoolHandler,
  };

  return (
    <SchoolsContext.Provider value={context}>
      {/* value={context} is for updating the context so that other components wrapped by this provider will be informed
       Wraps around all components that are interested in interacting with the context */}
      {props.children}
    </SchoolsContext.Provider>
  );
}

export default SchoolsContext;
