import { useContext, useRef } from "react";
import CarsContext from "../../store/cars-context";
import classes from "./NewCarForm.module.css";

type Car = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  year: string;
};

const NewCarForm: React.FC = (props: any) => {
  const carsCtx = useContext(CarsContext);
  const titleInputRef = useRef<HTMLInputElement>();
  const imageInputRef = useRef<HTMLInputElement>();
  const descriptionInputRef = useRef<HTMLTextAreaElement>();
  const priceInputRef = useRef<HTMLInputElement>();
  const yearInputRef = useRef<HTMLInputElement>();
  const idInputRef = useRef<HTMLInputElement>();

  function submitHandler(event: any) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current?.value;
    const enteredImage = imageInputRef.current?.value;
    const enteredDescription = descriptionInputRef.current?.value;
    const enteredPrice = priceInputRef.current?.value;
    const enteredYear = yearInputRef.current?.value;
    const enteredId = idInputRef.current?.value;

    if (
      enteredTitle !== undefined &&
      enteredImage !== undefined &&
      enteredDescription !== undefined &&
      enteredPrice !== undefined &&
      enteredYear !== undefined &&
      enteredId !== undefined
    ) {
      const carData: Car = {
        description: enteredDescription,
        id: enteredId,
        image: enteredImage,
        price: enteredPrice,
        title: enteredTitle,
        year: enteredYear,
      };
      carsCtx.addNewcar(carData);
    }

    if (
      titleInputRef.current !== undefined &&
      imageInputRef.current !== undefined &&
      descriptionInputRef.current !== undefined &&
      priceInputRef.current !== undefined &&
      yearInputRef.current !== undefined &&
      idInputRef.current !== undefined
    ) {
      titleInputRef.current.value = "";
      imageInputRef.current.value = "";
      descriptionInputRef.current.value = "";
      priceInputRef.current.value = "";
      yearInputRef.current.value = "";
      idInputRef.current.value = "";
    }
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="image">Car Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Car id</label>
          <input type="text" required id="image" ref={idInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="title">Car Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows={5}
            ref={descriptionInputRef}
          ></textarea>
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Price</label>
          <input type="text" required id="address" ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Year</label>
          <input type="text" required id="title" ref={yearInputRef} />
        </div>

        <div className={classes.actions}>
          <button>Add Car</button>
        </div>
      </form>
    </>
  );
};

export default NewCarForm;
