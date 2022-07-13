import classes from "./CartList.module.css";
import Car from "../Car/Index";
import React from "react";

type ForCar = {
  id: string;
  title: string;
  image: string;
  description?: string;
  price?: string;
  year?: string;
};

type Props = {
  cars: ForCar[];
};

const CarList: React.FC<Props> = (props) => {
  return (
    <ul className={classes.list}>
      {props.cars.map((car: ForCar) => (
        <Car key={car.id} id={car.id} title={car.title} image={car.image} />
      ))}
    </ul>
  );
};

export default React.memo(CarList);
