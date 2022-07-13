import classes from "./Car.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CarsContext from "../../store/cars-context";
import React from "react";

interface Props {
  id: string;
  image: string;
  title: string;
  description?: string;
  price?: string;
  year?: string;
}

const Car: React.FC<Props> = (props) => {
  const carsCtx = useContext(CarsContext);

  const IsItemFavorite = carsCtx.carIsFavorite(props.id);
  const deleteCar = carsCtx.deleteCar;

  const toggleFavoriteStatusHandler = () => {
    if (IsItemFavorite) {
      carsCtx.removeFavorite(props.id);
    } else {
      carsCtx.addFavorite({
        id: props.id,
        image: props.image,
        title: props.title,
        description: props.description,
        price: props.price,
        year: props.year,
      });
    }
  };

  return (
    <li className={classes.main}>
      <div className={classes.card}>
        <div>
          <img src={props.image} alt={props.title} />
        </div>
        <div>
          <h3>{props.title}</h3>
          <span>{props.description}</span>
          <p>{props.price}</p>
          <p>{props.year}</p>
        </div>
        <div>
          <button>
            <Link to={`/cars/${props.id}`}>Show Details</Link>
          </button>
          <button onClick={toggleFavoriteStatusHandler}>
            {IsItemFavorite ? "Remove from favaroite" : "Add to favaroite"}
          </button>
          <button
            onClick={() => {
              deleteCar(props.id);
            }}
          >
            Remove Car
          </button>
        </div>
      </div>
    </li>
  );
};

export default React.memo(Car);
