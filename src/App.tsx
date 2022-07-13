import React, { Fragment, useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import CarDetails from "./pages/Cars/CarDetails/Index";
import Cars from "./pages/Cars/Index";
import FavoriteCars from "./pages/Cars/FavoriteCars/Index";

import Welcome from "./pages/Homepage/WelcomePage";
import NotFound from "./pages/Homepage/NotFoundPage";

import HomePage from "./pages/Homepage";
import AuthContext from "./store/auth-context";
import SignUp from "./pages/LoginForm/SignUp";
import SignIn from "./pages/LoginForm/SignIn";
import NewCar from "./pages/NewCar";

const App: React.FC = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    AuthCtx.isLoggedIn ? history.push("/welcome") : history.push("/homepage");
  }, [AuthCtx.isLoggedIn, history]);

  return (
    <Fragment>
      <header>
        <MainNavigation />
      </header>
      <main>
        <Switch>
          {!AuthCtx.isLoggedIn && (
            <Route path="/" exact>
              <Redirect to="/homepage" />
            </Route>
          )}

          {!AuthCtx.isLoggedIn && (
            <Route path="/homepage">
              <HomePage />
            </Route>
          )}

          {AuthCtx.isLoggedIn && (
            <Route path="/" exact>
              <Redirect to="/welcome" />
            </Route>
          )}

          {AuthCtx.isLoggedIn && (
            <Route path="/welcome">
              <Welcome />
            </Route>
          )}

          <Route path="/cars" exact>
            <Cars />
          </Route>

          <Route path="/cars/:carId">
            <CarDetails />
          </Route>

          <Route path="/favorites">
            <FavoriteCars />
          </Route>
          <Route path="/new-car">
            <NewCar />
          </Route>

          <Route path="/SignUp-Form">
            <SignUp />
          </Route>
          <Route path="/SignIn-Form">
            <SignIn />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
};

export default App;
