import React from "react";
import "../../ComponentsCSS/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function DropDownFilter({ chosen, setChosen }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="dropdown-container">
            <div
                className="dropdown-button"
                onClick={() => {
                    setOpen(!open)
                }}
            >
                {chosen}
                <FontAwesomeIcon className="fa-chevron-down" icon={faChevronDown} />
            </div>
            {open && (
                <div className="dropdown-content">
                    <li className="dropdown-item">
                        <p className="dropdown-item"
                            onClick={() => {
                                setChosen("Latest")
                                setOpen(!open)
                            }}>
                            Latest
                        </p>
                    </li>
                    <li className="dropdown-item">
                        <p className="dropdown-item"
                            onClick={() => {
                                setChosen("Oldest")
                                setOpen(!open)
                            }}>
                            Oldest
                        </p>
                    </li>
                    <li className="dropdown-item">
                        <p className="dropdown-item"
                            onClick={() => {
                                setChosen("Activity")
                                setOpen(!open)
                            }}>
                            Activity
                        </p>
                    </li >
                </div >
            )
            }
        </div >
    );
}

export default DropDownFilter;
