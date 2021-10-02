import React from "react";

import classes from "./StartingPage.module.css";

import { useSelector } from "react-redux";
import AllArticles from "../../../article/AllArticles";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const StartingPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className={classes.starting}>
      <h1>Welcome {user.email}!</h1>
      
      <AllArticles />

      <div className={classes["add-article-section"]}>
        <Link to="/articles/add">
          <Button type="button">Add Article</Button>
        </Link>
      </div>
    </section>
  );
};

export default StartingPage;
