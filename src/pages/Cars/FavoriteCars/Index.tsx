import classes from "./Favorite.module.css";
import { useCallback, useContext, useEffect } from "react";
import CarsContext from "../../../store/cars-context";
import CarList from "../../../components/CarList/Index";

import AuthContext from "../../../store/auth-context";

const FavoriteCars: React.FC = () => {
  const carsCtx = useContext(CarsContext);
  const authCtx = useContext(AuthContext);

  const favCars = carsCtx.newFavCars;
  const setFavCars = carsCtx.setNewFavCars;

  const userId = authCtx.id;

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `https://cars-8cd1c-default-rtdb.firebaseio.com/cars/${userId}/favariteCars.json`
    );
    const data = await res.json();

    setFavCars(data || []);

    carsCtx.replaceFavoritesCars(data || []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.centered}>
      <h1>My Favorite Cars</h1>
      {favCars !== null && favCars.length >= 1 ? (
        <CarList cars={favCars} />
      ) : (
        <h2>No favorite cars yet...</h2>
      )}
    </div>
  );
};

export default FavoriteCars;
