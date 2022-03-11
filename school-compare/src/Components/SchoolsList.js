import SchoolsCard from "./SchoolsCard";
import "../ComponentsCSS/SchoolsList.css";

function SchoolsList(props) {
  return (
    <ul className="list">
      {props.schools.map((school) => (
        <div key={school.school_name}>
          <SchoolsCard data={school} />
        </div>
      ))}
    </ul>
  );
}

export default SchoolsList;
