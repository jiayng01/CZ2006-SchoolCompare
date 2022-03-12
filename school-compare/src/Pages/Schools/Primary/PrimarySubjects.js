import React from "react";
import useFetch from "../../../CustomHooks/useFetch";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Dropdown from "../../../Components/Dropdown";
import CompareButton from "../../../Components/CompareButton";
import SideDrawer from "../../../Components/SideDrawer";
import SubjectsCard from "../../../Components/SubjectsCard";

import "../../../ComponentsCSS/PaginationButtons.css";
import "../../../ComponentsCSS/SchoolsCard.css";
import "../../../ComponentsCSS/SchoolSearchBar.css";
import SchoolsCard from "../../../Components/SchoolsCard";

function PrimarySubjects() {
  const [pageNumber, setPageNumber] = useState(0);
  const schoolsPerPage = 20;
  const noOfSchoolsVisited = pageNumber * schoolsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  // Fetching data

  const { data, loading, error } = useFetch(
    "https://data.gov.sg/api/action/datastore_search?resource_id=3bb9e6b0-6865-4a55-87ba-cc380bc4df39&limit=3400"
  );

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScaleLoader color={"#1e2327"} loading={loading} size={30} />
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  // initialize schools
  let schools = [];
  let filteredSchools = [];

  if (data != null) {
    // filter to get primary school data
    let index = 0; // to ensure the school appear in numeric order, using i will skip some numbers
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].school_name.includes("PRIMARY") ||
        data[i].school_name.includes("JUNIOR SCHOOL") ||
        data[i].school_name.includes("CHIJ OUR LADY") ||
        data[i].school_name.includes("KELLOCK") ||
        data[i].school_name.includes("AI TONG") ||
        data[i].school_name.includes("DE LA SALLE") ||
        data[i].school_name.includes("CHONGFU") ||
        data[i].school_name.includes("HAIG") ||
        data[i].school_name.includes("HONG WEN") ||
        data[i].school_name.includes("KHENG CHENG") ||
        data[i].school_name.includes("KONG HWA") ||
        data[i].school_name.includes("MEE TOH") ||
        data[i].school_name.includes("PEI CHUN") ||
        data[i].school_name.includes("POI CHING") ||
        data[i].school_name.includes("RED SWASTIKA") ||
        data[i].school_name.includes("ROSYTH") ||
        data[i].school_name.includes("TAO NAN") ||
        data[i].school_name.includes("ST. STEPHEN'S") ||
        data[i].school_name.includes("MARYMOUNT CONVENT") ||
        data[i].school_name.includes("MAHA BODHI SCHOOL")
      ) {
        schools[index++] = data[i];
      }
    }
    console.log("hello " + schools);
    schools.sort((a,b)=>{
        return a._id- b._id;
    })

    if (schools !== undefined) {
      let arrayCounter = 0;
      let currentSchool = schools[0].school_name;

      filteredSchools.push(schools[0]);
      for (let j = 1; j < schools.length; j++) {
        if (currentSchool === schools[j].school_name) {
          filteredSchools[arrayCounter].subject_desc +=
            ", " + schools[j].subject_desc;
          // filteredSchools[arrayCounter].subject_desc = schools[j].subject_desc;
        } else {
          currentSchool = schools[j].school_name;
          filteredSchools.push(schools[j]);
          arrayCounter++;
        }
      }
    }
  }

  let count = 0;
  // get only the schools we want
  const displaySchools = filteredSchools
    .filter((value) => {
      if (searchTerm === "") return value;
      else if (
        value.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.subject_desc.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return value;
      }
    })
    .slice(noOfSchoolsVisited, noOfSchoolsVisited + schoolsPerPage)
    .map((school) => (
      <div key={count++}>
        <SubjectsCard data={school} />
      </div>
    ));

  // Determine number of pages
  const pageCount = Math.ceil(filteredSchools.length / schoolsPerPage);

  const handlePageClick = (event) => {
    setPageNumber(event.selected);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SideDrawer level="primary" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown currentPage={"Primary"} />
        <input
          className="search-bar"
          type="text"
          placeholder="Type to Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "70%",
          margin: "auto",
          marginBottom: "1rem",
        }}
      >
        <div className="school-level-title">Primary Schools </div>
        <CompareButton />
      </div>

      {displaySchools}

      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={8}
        renderOnZeroPageCount={null}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButtons"}
        nextLinkClassName={"nextButtons"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
}

export default PrimarySubjects;
