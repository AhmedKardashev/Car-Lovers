// import { Link } from "react-router-dom";
// import classes from "./CarDetail.module.css";
// import CarList from "../../components/CarList";
import CarList from "../../components/CarList/Index";

import { useCallback, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpiner";
import CarsContext from "../../store/cars-context";

const Cars: React.FC = () => {
  const carsCtx = useContext(CarsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const res = await fetch(
      "https://cars-8cd1c-default-rtdb.firebaseio.com/cars/-N5_-NlIht5qfQ4Q1O31.json"
    );

    const data = await res.json();

    const cars = [];

    for (const key in data.DUMMY_CARS) {
      const car = {
        id: data.DUMMY_CARS[key].id,
        ...data.DUMMY_CARS[key],
      };

      cars.push(car);
    }

    setIsLoading(false);

    carsCtx.addCars(cars);
  }, []);

  useEffect(() => {
    const data = fetchData();

    data.catch((error) => {
      setIsLoading(false);
      setHasError(true);
    });
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
        <p>Loading...</p>
      </div>
    );
  }
  if (hasError) {
    return (
      <div className="centered">
        <h1>Fetch Failed, please try again later !</h1>
      </div>
    );
  }

  return (
    <div>
      <CarList cars={carsCtx.cars} />
    </div>
  );
};

export default Cars;
