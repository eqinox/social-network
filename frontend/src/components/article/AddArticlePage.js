import React, { Fragment } from "react";
import { useHistory } from "react-router";
import Button from "../UI/Button";

import AddArticleForm from "./AddArticleForm";

import classes from "./AddArticlePage.module.css";

const AddArticlePage = () => {
  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <AddArticleForm />
      <div className={classes.buttons}>
        <Button type="button" onBackClick={goBackHandler}>
          Back
        </Button>
      </div>
    </Fragment>
  );
};

export default AddArticlePage;
