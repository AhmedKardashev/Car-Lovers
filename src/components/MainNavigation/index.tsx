import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/auth-context";

const MainNavigation: React.FC = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>Welcome !</div>
        <nav>
          <ul>
            {authCtx.isLoggedIn && (
              <>
                <li>
                  <NavLink to="/cars" activeClassName={classes.active}>
                    Cars
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/favorites" activeClassName={classes.active}>
                    My Favorites Cars
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/new-car">Add New Car</NavLink>
                </li>

                <li>
                  <NavLink to="/welcome">Welcome</NavLink>
                </li>
              </>
            )}

            {!authCtx.isLoggedIn && (
              <>
                <li>
                  <NavLink to="/SignIn-Form" activeClassName={classes.active}>
                    Sign in
                  </NavLink>
                </li>
              </>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <button onClick={authCtx.onLoggout}>Log out</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainNavigation;
