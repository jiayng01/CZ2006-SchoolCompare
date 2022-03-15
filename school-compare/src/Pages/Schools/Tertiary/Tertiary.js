import React from "react";
import useFetch from "../../../CustomHooks/useFetch";
import SchoolsCard from "../../../Components/SchoolsCard";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Dropdown from "../../../Components/Dropdown";
import CompareButton from "../../../Components/CompareButton";
import SideDrawer from "../../../Components/SideDrawer";

import "../../../ComponentsCSS/PaginationButtons.css";
import "../../../ComponentsCSS/SchoolsCard.css";
import "../../../ComponentsCSS/SchoolSearchBar.css";

function Tertiary() {
  const [pageNumber, setPageNumber] = useState(0);
  const schoolsPerPage = 20;
  const noOfSchoolsVisited = pageNumber * schoolsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  // Fetching data
  const { data, loading, error } = useFetch(
    "https://data.gov.sg/api/action/datastore_search?resource_id=ede26d32-01af-4228-b1ed-f05c45a1d8ee&&limit=400"
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

  if (data != null) {
    // filter to get primary school data
    let index = 0; // to ensure the school appear in numeric order, using i will skip some numbers
    for (var i = 0; i < data.length; i++) {
      if ( /* Total 18 entries*/
        data[i].mainlevel_code === "JUNIOR COLLEGE" ||
        (data[i].school_name.includes("INSTITUTION") &&
          !data[i].school_name.includes("JUNIOR")) ||
        (data[i].mainlevel_code === "MIXED LEVELS" &&
          (data[i].school_name.includes("NATIONAL") ||
            data[i].school_name.includes("JUNIOR COLLEGE") ||
            data[i].school_name.includes("DUNMAN") ||
            data[i].school_name.includes("RIVER") ||
            data[i].school_name.includes("INDEPENDENT")))
      ) {
        schools[index++] = data[i];
      }
    }
  }

  // get only the schools we want
  const displaySchools = schools
    .filter((value) => {
      if (searchTerm === "") return value;
      else if (
        value.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.postal_code
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase() ||
              value.mrt_desc.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ) {
        return value;
      }
    })
    .slice(noOfSchoolsVisited, noOfSchoolsVisited + schoolsPerPage)
    .map((school) => (
      <div key={school.school_name}>
        <SchoolsCard data={school} />
      </div>
    ));

  // Determine number of pages
  const pageCount = Math.ceil(schools.length / schoolsPerPage);

  const handlePageClick = (event) => {
    setPageNumber(event.selected);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <SideDrawer level="Tertiary" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown currentPage={"Tertiary"} />
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
        <div className="school-level-title">Tertiary Schools </div>
        <CompareButton />
      </div>

      <Dropdown currentPage={"Tertiary"} />
      {displaySchools}
      <ReactPaginate
        previousLabel="<"
        nextLabel=" >"
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
    </div>
  );
}

export default Tertiary;
