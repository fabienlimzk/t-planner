import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} {...rest} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
