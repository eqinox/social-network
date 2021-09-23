import React, { useRef, useState, Fragment } from "react";
import classes from "./AuthForm.module.css";

import Notification from "../UI/Notification";

// redux
import { useDispatch, useSelector } from "react-redux";
import { sendUserData } from "../../store/user-actions";

const AuthForm = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const [loginMode, setLoginMode] = useState(true);
  const email = useRef();
  const password = useRef();

  const switchAuthModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newUser = {
      email: email.current.value,
      password: password.current.value,
    };

    dispatch(sendUserData(newUser));
  };

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <section className={classes.auth}>
        <h1>{loginMode ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={email} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={password} />
          </div>
          <div className={classes.actions}>
            <button>{loginMode ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {loginMode ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default AuthForm;
