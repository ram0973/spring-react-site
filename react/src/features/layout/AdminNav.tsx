import {Link} from "react-router-dom";

const AdminNav = () => {
  return (
    <h2>
      <Link to={"/admin/persons"}>Persons list</Link>
    </h2>
  );
};

export default AdminNav;
