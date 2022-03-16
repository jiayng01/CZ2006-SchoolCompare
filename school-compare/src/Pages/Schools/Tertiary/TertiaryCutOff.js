import React from "react";

import JCCutOff from "../../../CutOff/JC_cut_off.json"; /* CutOffPoints */
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Dropdown from "../../../Components/Dropdown";
import CompareButton from "../../../Components/CompareButton";
import SideDrawer from "../../../Components/SideDrawer";
import CutOffCard from "../../../Components/CutOffCard";

import "../../../ComponentsCSS/PaginationButtons.css";
import "../../../ComponentsCSS/SchoolsCard.css";
import "../../../ComponentsCSS/SchoolSearchBar.css";
import Tertiary from "./Tertiary";

function TertiaryCutOff() {
  const [pageNumber, setPageNumber] = useState(0);
  const schoolsPerPage = 20;
  const noOfSchoolsVisited = pageNumber * schoolsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  /* extract the data we want */
  const displaySchools = JCCutOff.filter((value) => {
    if (searchTerm === "") return value;
    else if (
      value.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      value.arts.includes(searchTerm) || // Numbers
      value.science.includes(searchTerm) // Numbers
    ) {
      return value;
    }
  })
    .slice(noOfSchoolsVisited, noOfSchoolsVisited + schoolsPerPage)
    .map((school) => (
      <div key={school._id}>
        <CutOffCard data={school} level={"Tertiary"}/>
      </div>
    ));

  const pageCount = Math.ceil(JCCutOff.length / schoolsPerPage);

  const handlePageClick = (event) => {
    setPageNumber(event.selected);
    window.scrollTo(0, 0);
  };
  return (
    <>
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

export default TertiaryCutOff;
