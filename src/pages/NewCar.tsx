// import { useHistory } from "react-router-dom";
import classes from "./NewCar.module.css";

import NewCarForm from "../components/NewCarForm/Index";

const NewCar: React.FC = () => {
  return (
    <section>
      <h1 className={classes.centered}>Add New Car</h1>
      <NewCarForm />
    </section>
  );
};

export default NewCar;
