import React, { useMemo } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CarsContext from "../../../store/cars-context";
import classes from "./CarDetail.module.css";
type Params = {
  carId: string;
};

const CarDetails: React.FC = () => {
  const params = useParams<Params>();
  const carsCtx = useContext<any>(CarsContext);

  const car = useMemo(() => {
    return carsCtx.cars.find((car: { id: string }) => car.id === params.carId);
  }, [carsCtx.cars, params.carId]);

  return (
    <section className={classes.centered}>
      <h1>Car details</h1>
      {car && (
        <>
          <img src={car.image} alt={car.title} />
          <h2>{car.title}</h2>
          <span>{car.description}</span>
          <p>{car.price}</p>
          <p>{car.year}</p>
        </>
      )}
    </section>
  );
};
export default CarDetails;
