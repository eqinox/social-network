import React, { Fragment } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import EditArticleForm from "../components/EditArticleForm";
import Button from "../../shared/components/UI/Button";

import classes from "./EditArticlePage.module.css";

const EditArticlePage = () => {
  const history = useHistory();

  const selectedArticle = useSelector(
    (state) => state.articles.selectedArticle
  );

  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <EditArticleForm article={selectedArticle} />
      <div className={classes.buttons}>
        <Button type="button" onBackClick={goBackHandler}>
          Back
        </Button>
      </div>
    </Fragment>
  );
};

export default EditArticlePage;
