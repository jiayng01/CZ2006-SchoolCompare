import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import secondaryCutOff from "../JSON/secondary_cut_off.json"; /* CutOffPoints */
import JCCutOff from "../JSON/JC_cut_off.json"; /* CutOffPoints */

const setUp = () => {
  let combined = [];
  axios
    .get(
      /* general information APi */
      "https://data.gov.sg/api/action/datastore_search?resource_id=ede26d32-01af-4228-b1ed-f05c45a1d8ee&&limit=400"
    )
    .then((response) => {
      combined = response.data.result.records;
      axios
        .get(
          /* subjects API*/
          "https://data.gov.sg/api/action/datastore_search?resource_id=3bb9e6b0-6865-4a55-87ba-cc380bc4df39&limit=3400"
        )
        .then((response) => {
          for (let i = 0; i < combined.length; i++) {
            for (let j = 0; j < response.data.result.records.length; j++) {
              if (combined[i].subject_desc === undefined) {
                combined[i].subject_desc = [];
              }
              if (
                combined[i].school_name ===
                response.data.result.records[j].school_name
              ) {
                combined[i].subject_desc.push(
                  response.data.result.records[j].subject_desc
                );
              }
            }
          }

          /* for cut off points */
          for (let i = 0; i < combined.length; i++) {
            for (let j = 0; j < JCCutOff.length; j++) {
              /* get only JC and IP schools */
              if (
                combined[i].school_name.includes("JUNIOR COLLEGE") ||
                combined[i].school_name.includes("INSTITUTION") ||
                combined[i].school_name.includes("INDEPENDENT") ||
                combined[i].school_name === "RIVER VALLEY HIGH SCHOOL" ||
                combined[i].school_name === "DUNMAN HIGH SCHOOL"
              ) {
                if (
                  combined[i].arts === undefined &&
                  combined[i].science === undefined
                ) {
                  combined[i].arts = [];
                  combined[i].science = [];
                }

                if (
                  combined[i].school_name.toLowerCase() ===
                  JCCutOff[j].name.toLowerCase()
                ) {
                  combined[i].arts.push(JCCutOff[j].arts);
                  combined[i].science.push(JCCutOff[j].science);
                }
              }
            }
          }

          for (let i = 0; i < combined.length; i++) {
            for (let j = 0; j < secondaryCutOff.length; j++) {
              if (
                combined[i].mainlevel_code === "SECONDARY" ||
                combined[i].mainlevel_code === "MIXED LEVELS"
              ) {
                if (
                  combined[i].express === undefined &&
                  combined[i].na === undefined &&
                  combined[i].nt === undefined
                ) {
                  combined[i].express = [];
                  combined[i].na = [];
                  combined[i].nt = [];
                }

                if (
                  combined[i].school_name.toLowerCase() ===
                  secondaryCutOff[j].name.toLowerCase()
                ) {
                  combined[i].express.push(secondaryCutOff[j].express);
                  combined[i].na.push(secondaryCutOff[j].na);
                  combined[i].nt.push(secondaryCutOff[j].nt);
                }
              }
            }
          }

          /* CCAs */
          axios
            .get(
              /* CCAs API*/
              "https://data.gov.sg/api/action/datastore_search?resource_id=dd7a056a-49fa-4854-bd9a-c4e1a88f1181&limit=5430"
            )
            .then((response) => {
              for (let i = 0; i < combined.length; i++) {
                for (let j = 0; j < response.data.result.records.length; j++) {
                  if (
                    combined[i].physical_sports === undefined &&
                    combined[i].visual_and_pa === undefined &&
                    combined[i].clubs_and_societies === undefined &&
                    combined[i].uniformed_groups === undefined &&
                    combined[i].others === undefined
                  ) {
                    combined[i].physical_sports = [];
                    combined[i].visual_and_pa = [];
                    combined[i].clubs_and_societies = [];
                    combined[i].uniformed_groups = [];
                    combined[i].others = [];
                  }
                  if (
                    combined[i].school_name ===
                    response.data.result.records[j].school_name
                  ) {
                    let type =
                      response.data.result.records[j].cca_grouping_desc;

                    switch (type) {
                      case "PHYSICAL SPORTS":
                        combined[i].physical_sports.push(
                          response.data.result.records[j].cca_generic_name
                        );
                        break;
                      case "VISUAL AND PERFORMING ARTS":
                        combined[i].visual_and_pa.push(
                          response.data.result.records[j].cca_generic_name
                        );
                        break;
                      case "CLUBS AND SOCIETIES":
                        combined[i].clubs_and_societies.push(
                          response.data.result.records[j].cca_generic_name
                        );
                        break;
                      case "UNIFORMED GROUPS":
                        combined[i].uniformed_groups.push(
                          response.data.result.records[j].cca_generic_name
                        );
                        break;
                      case "OTHERS":
                        combined[i].others.push(
                          response.data.result.records[j].cca_generic_name
                        );
                        break;
                      default:
                        break;
                    }
                  }
                }
              }
              axios
                .get(
                  /* MOE Programme API*/
                  "https://data.gov.sg/api/action/datastore_search?resource_id=9a94c7ed-710b-4ba5-8e01-8588f129efcc&limit=80"
                )
                .then((response) => {
                  for (let i = 0; i < combined.length; i++) {
                    for (
                      let j = 0;
                      j < response.data.result.records.length;
                      j++
                    ) {
                      if (combined[i].moe_programme === undefined) {
                        combined[i].moe_programme = [];
                      }
                      if (
                        combined[i].school_name ===
                        response.data.result.records[j].school_name
                      ) {
                        combined[i].moe_programme.push(
                          response.data.result.records[j].moe_programme_desc
                        );
                      }
                    }
                  }
                  axios
                    .get(
                      /* School distinctive programme API*/
                      "https://data.gov.sg/api/action/datastore_search?resource_id=74362320-e29d-458f-aa56-d9971ee310fd&limit=290"
                    )
                    .then((response) => {
                      for (let i = 0; i < combined.length; i++) {
                        for (
                          let j = 0;
                          j < response.data.result.records.length;
                          j++
                        ) {
                          if (
                            combined[i].alp_domain === undefined &&
                            combined[i].alp_title === undefined &&
                            combined[i].llp_domain1 === undefined &&
                            combined[i].llp_title1 === undefined &&
                            combined[i].llp_domain2 === undefined &&
                            combined[i].llp_title2 === undefined
                          ) {
                            combined[i].alp_domain = [];
                            combined[i].alp_title = [];
                            combined[i].llp_domain1 = [];
                            combined[i].llp_title1 = [];
                            combined[i].llp_domain2 = [];
                            combined[i].llp_title2 = [];
                          }
                          if (
                            combined[i].school_name ===
                            response.data.result.records[j].school_name
                          ) {
                            combined[i].alp_domain.push(
                              response.data.result.records[j].alp_domain
                            );

                            combined[i].alp_title.push(
                              response.data.result.records[j].alp_title
                            );

                            combined[i].llp_domain1.push(
                              response.data.result.records[j].llp_domain1
                            );

                            combined[i].llp_title1.push(
                              response.data.result.records[j].llp_title1
                            );

                            combined[i].llp_domain2.push(
                              response.data.result.records[j].llp_domain2
                            );

                            combined[i].llp_title2.push(
                              response.data.result.records[j].llp_title2
                            );
                          }
                        }
                      }
                      /* get the huge data */
                      console.log("total combined = ", combined);
                      return combined;
                    })
                    .catch((err) => {
                      console.log(
                        "fifth get request error"
                      ); /* School Distinctive programmes */
                    });
                })
                .catch((err) => {
                  console.log("forth get request error"); /* MOE Programmes */
                });
            })
            .catch((err) => {
              console.log("third get request error"); /* CCAs */
            });
        })
        .catch((err) => {
          console.log("second get request error"); /* Subjects description */
        });
    })
    .catch((err) => {
      console.log("first get request error"); /* General Information*/
    });
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
