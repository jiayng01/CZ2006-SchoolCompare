import React from 'react'
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

function SecondarySubjects() {
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
  
    if (data != null) {
      // filter to get primary school data
      let index = 0; // to ensure the school appear in numeric order, using i will skip some numbers
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].school_name.includes("SECONDARY") ||
          data[i].school_name.includes("HIGH SCHOOL") ||
          data[i].school_name.includes("NATIONAL") ||
          data[i].school_name.includes("BARKER") ||
          data[i].school_name.includes("ENGLISH") ||
          (data[i].school_name.includes("CONVENT") && data[i].school_name.includes("CHIJ")) ||
          data[i].school_name.includes("CHIJ ST. NICHOLAS GIRLS' SCHOOL") ||
          data[i].school_name.includes("CREST") ||
          data[i].school_name.includes("GAN ENG SENG") ||
          data[i].school_name.includes("HWA CHONG") ||
          data[i].school_name.includes("HAI SING") ||
          data[i].school_name.includes("ST. PATRICK'S SCHOOL") ||
          data[i].school_name.includes("TANJONG KATONG GIRLS' SCHOOL") ||
          data[i].school_name.includes("VICTORIA SCHOOL") || 
          data[i].school_name.includes("NORTHLIGHT SCHOOL") 
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
          value.subject_desc.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return value;
        }
      })
      .slice(noOfSchoolsVisited, noOfSchoolsVisited + schoolsPerPage)
      .map((school) => (
        <div key={school.school_name}>
          <SubjectsCard data={school} />
        </div>
      ));
    const pageCount = Math.ceil(schools.length / schoolsPerPage);
  
    const handlePageClick = (event) => {
      setPageNumber(event.selected);
      window.scrollTo(0, 0);
    };
  
    return (
      <>
        <SideDrawer level="Secondary" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Dropdown currentPage={"Secondary"} />
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
          <div className="school-level-title">Secondary Schools </div>
          <CompareButton />
        </div>
  
        {/* {displaySchools} */}
        {/* <ReactPaginate
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
        /> */}
      </>
    );
  }

export default SecondarySubjects