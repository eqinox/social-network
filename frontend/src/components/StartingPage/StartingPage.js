import React from "react";

import classes from "./StartingPage.module.css";

import { useSelector, useDispatch } from "react-redux";
import AllArticles from "../article/AllArticles";
import Button from "../UI/Button";

const StartingPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onAddArticleHandler = () => {
    dispatch();
  }

  return (
    <section className={classes.starting}>
      <h1>Welcome {user.email}!</h1>
      <AllArticles />
      <div className={classes["add-article-section"]}>
        <Button onClick={onAddArticleHandler}>Add Article</Button>
      </div>
    </section>
  );
};

export default StartingPage;
