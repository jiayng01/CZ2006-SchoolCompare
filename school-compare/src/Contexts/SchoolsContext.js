import React from "react";
import { createContext,useState } from "react";
const setUp = () => {
    
}

const SchoolsContext = createContext({
  schools: [],
  addSchool: (school) => {}
}); //context is a javascript object
// FavouritesContext will contain a react component, so follow naming convention of component
// these are initial values
export function FavouritesContextProvider(props) {
  const [schools, setSchools] = useState([]);

  function addSchoolHandler(school) {
    setSchools((currentSchools) => {
      return currentSchools.push(school);
    });
  }

  const context = {
    schools: schools, 
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
