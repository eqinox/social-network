import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import AuthForm from "./components/user/AuthForm";
import { uiActions } from "./store/ui-slice";

const App = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  useEffect(() => {
    setTimeout(() => {
      dispatch(uiActions.hideNotification())
    }, 5000);
    
  }, [ui]);
  return (
    <Fragment>
      <AuthForm />
    </Fragment>
  );
};

export default App;
