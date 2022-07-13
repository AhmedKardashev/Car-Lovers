import classes from "./Forms.module.css";
import { useRef, useState, FormEvent, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
// import SignUpService from "../../services/SignUpService";

const SignUp: React.FC = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const emailInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();
  const confirmPasswordInput = useRef<HTMLInputElement>();

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPass, setIsValidPass] = useState<boolean>(true);

  const switchAuthModeHandler = () => {
    history.push("/SignIn-Form");
  };

  const submitRegisterHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredRegisterEmail = emailInput.current?.value;
    const enteredRegisterPassword = passwordInput.current?.value;
    const enteredConfirmRegisterPassword = confirmPasswordInput.current?.value;

    if (enteredRegisterPassword !== enteredConfirmRegisterPassword) {
      setIsValidPass(false);
      return;
    }
    if (enteredRegisterEmail) {
      if (!enteredRegisterEmail.includes("@")) {
        setIsValidEmail(false);
        return;
      }
    }

    // if (enteredRegisterEmail && enteredRegisterPassword) {
    //   SignUpService(enteredRegisterEmail, enteredRegisterPassword);
    // }

    // const userId = localStorage.getItem("userId");

    // if (userId !== null) {
    //   authCtx.onLoggin(userId);
    // }

    // if (
    //   emailInput.current &&
    //   passwordInput.current &&
    //   confirmPasswordInput.current
    // ) {
    //   emailInput.current.value = "";
    //   passwordInput.current.value = "";
    //   confirmPasswordInput.current.value = "";
    // }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyZKEUQQ69dqFZexbEz20kFMaQMlrdCr0",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredRegisterEmail,
          password: enteredRegisterPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "aplication/json",
        },
      }
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "The account exists, enter a new one !";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        console.log(data);
        // localStorage.setItem("id", data.localId);
        authCtx.onLoggin(data.localId);
        return data;
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <section>
      <form onSubmit={submitRegisterHandler}>
        <div className={classes.container}>
          <h1>Sign Up</h1>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            ref={emailInput}
            required
          />
          {!isValidEmail && <p>Incorect Email</p>}

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            ref={passwordInput}
            required
          />
          {!isValidPass && <p>The passwords do not match </p>}

          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            id="psw-repeat"
            ref={confirmPasswordInput}
            required
          />

          <hr />
          <div className={classes.actions}>
            <button>Create Account</button>

            <button onClick={switchAuthModeHandler}>
              Sign in with an existing account
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
