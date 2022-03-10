import React from "react";
import useFetch from "../../CustomHooks/useFetch";
import SchoolsCard from "../../Components/SchoolsCard";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import "../../ComponentsCSS/PaginationButtons.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import Dropdown from "../../Components/Dropdown";

function Tertiary() {
  const [pageNumber, setPageNumber] = useState(0);
  const schoolsPerPage = 20;
  const noOfSchoolsVisited = pageNumber * schoolsPerPage;

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

  let schools = [];

  if (data != null) {
    // filter to get primary school data
    let index = 0; // to ensure the school appear in numeric order, using i will skip some numbers
    for (var i = 0; i < data.length; i++) {
      if (data[i].mainlevel_code === "JUNIOR COLLEGE") {
        schools[index++] = data[i];
      }
    }
  }

  const displaySchools = schools
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
      <Dropdown currentPage={"Tertiary"}/>
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
