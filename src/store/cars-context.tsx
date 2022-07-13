import React, { createContext, useState, useContext, ReactNode } from "react";
import AuthContext from "./auth-context";

type CarsContextType = {
  cars: Car[];
  favorites: Car[];
  newFavCars: Car[];
  setNewFavCars: (cars: Car[]) => void;
  replaceFavoritesCars: (newFavCars: Car[]) => void;
  addFavorite: (favoriteCar: Car) => void;
  removeFavorite: (carId: string) => void;
  carIsFavorite: (carId: string) => boolean | undefined;
  addCars: (cars: Car[]) => void;
  addNewcar: (car: Car) => void;
  deleteCar: (carId: string) => void;
};

type Props = {
  children: ReactNode;
};

type Car = {
  description?: string;
  id: string;
  image: string;
  price?: string;
  title: string;
  year?: string;
};

const CarsContext = createContext<CarsContextType>({
  cars: [],
  favorites: [],
  newFavCars: [],
  setNewFavCars: (cars) => {},
  replaceFavoritesCars: (newFavCars) => {},
  addFavorite: (favoriteCar) => {},
  removeFavorite: (carId) => {},
  carIsFavorite: (carId) => {
    return true || false;
  },

  addCars: (cars) => {},
  addNewcar: (car) => {},
  deleteCar: (car) => {},
});

export const CarsContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [userFavorites, setUserFavorites] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [newFavCars, setNewFavCars] = useState<Car[]>([]);
  const authCtx = useContext(AuthContext);
  const userId = authCtx.id;

  const sendData = React.useCallback(
    async (newCar: Car) => {
      const favariteCars = [...userFavorites, newCar];

      const response = await fetch(
        `https://cars-8cd1c-default-rtdb.firebaseio.com/cars/${userId}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favariteCars: favariteCars }),
        }
      );

      return response;
    },
    [userFavorites, userId]
  );

  const sendDeletedFavCars = React.useCallback(
    async (carId: string) => {
      const newFavoriteCars = userFavorites.filter(
        (car: Car) => car.id !== carId
      );

      const response = await fetch(
        `https://cars-8cd1c-default-rtdb.firebaseio.com/cars/${userId}/.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favariteCars: newFavoriteCars }),
        }
      );
      return response;
    },
    [userFavorites, userId]
  );

  const addCarsHandler = (cars: Car[]) => {
    setCars(cars);
  };

  const addCarHandler = async (carData: Car) => {
    const response = await fetch(
      "https://cars-8cd1c-default-rtdb.firebaseio.com/cars/-N5_-NlIht5qfQ4Q1O31/DUMMY_CARS.json",
      {
        method: "POST",
        body: JSON.stringify(carData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(await response.json());
  };

  const deleteCarHanler = async (CarId: string) => {
    const response = await fetch(
      `https://cars-8cd1c-default-rtdb.firebaseio.com/cars/-N5_-NlIht5qfQ4Q1O31/DUMMY_CARS/${CarId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };

  const setNewFavCarsHanler = (cars: Car[]) => {
    setNewFavCars(cars);
  };

  const replaceFavCars = (newFavCars: Car[]) => {
    setUserFavorites(newFavCars);
  };

  const addFavoriteHandler = React.useCallback(
    async (favoriteCar: Car) => {
      const response = await sendData(favoriteCar);

      if (response.ok) {
        setUserFavorites((prevUserFavorites) => {
          return [...prevUserFavorites, favoriteCar];
        });
      }
    },

    [sendData]
  );

  const removeFavoriteHandler = React.useCallback(
    async (carId: string) => {
      setUserFavorites((prevUserFavorites) => {
        return prevUserFavorites.filter((car: Car) => car.id !== carId);
      });
      await sendDeletedFavCars(carId);
    },
    [sendDeletedFavCars]
  );

  const isFavoriteHandler = React.useCallback(
    (carId: string) => {
      return userFavorites.some((car: Car) => car.id === carId);
    },
    [userFavorites]
  );

  const CarsContextValue: CarsContextType = {
    cars: cars,
    favorites: userFavorites,
    newFavCars: newFavCars,
    setNewFavCars: setNewFavCarsHanler,
    replaceFavoritesCars: replaceFavCars,
    carIsFavorite: isFavoriteHandler,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    addCars: addCarsHandler,
    addNewcar: addCarHandler,
    deleteCar: deleteCarHanler,
  };

  return (
    <CarsContext.Provider value={CarsContextValue}>
      {children}
    </CarsContext.Provider>
  );
};

export default CarsContext;
