import React from 'react';

import classes from "./StartingPage.module.css";

import { useSelector } from "react-redux";

const StartingPage = () => {
  const user = useSelector((state) => state.user);
  return (
    <section className={classes.starting}>
      <h1>Welcome {user.email}!</h1>
    </section>
  );
};

export default StartingPage;
