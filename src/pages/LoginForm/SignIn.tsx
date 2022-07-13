import classes from "./Forms.module.css";
import { useRef, useContext, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";

type AuthContextType = {
  id: string | null;
  isLoggedIn: boolean;
  onLoggout: () => void;
  onLoggin: (id: string) => void;
};

const SignIn: React.FC = () => {
  const authCtx = useContext<AuthContextType>(AuthContext);
  const history = useHistory();

  const emailLoginInput = useRef<HTMLInputElement>();
  const passwordLoginInput = useRef<HTMLInputElement>();

  const switchAuthModeHandler = () => {
    history.push("/SignUp-Form");
  };

  const submitLoginHandler = async (event: FormEvent) => {
    event.preventDefault();
    const enteredLoginEmail = emailLoginInput.current?.value;
    const enteredLoginPassword = passwordLoginInput.current?.value;

    if (emailLoginInput.current && passwordLoginInput.current) {
      emailLoginInput.current.value = "";
      passwordLoginInput.current.value = "";
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyZKEUQQ69dqFZexbEz20kFMaQMlrdCr0",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredLoginEmail,
          password: enteredLoginPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "aplication/json",
        },
      }
    )
      .then(async (res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          const data = await res.json();
          console.log(data);
          if (data.error) {
            alert("Please enter  existing account");

            if (emailLoginInput.current && passwordLoginInput.current) {
              emailLoginInput.current.value = "";
              passwordLoginInput.current.value = "";
            }
          }
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.onLoggin(data.localId);

        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section>
      <form onSubmit={submitLoginHandler}>
        <div className={classes.container}>
          <h1>Sign in</h1>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            ref={emailLoginInput}
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            ref={passwordLoginInput}
            required
          />

          <hr />
          <div className={classes.actions}>
            <button>Login</button>
            <button onClick={switchAuthModeHandler}>Create Account</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
