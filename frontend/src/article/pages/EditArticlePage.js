import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import EditArticleForm from "../components/EditArticleForm";
import Button from "../../shared/components/UI/Button";
import { getOneArticle } from "../../store/article/article-actions";

import classes from "./EditArticlePage.module.css";

const EditArticlePage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const articleId = props.match.params.id;
  const selectedArticle = useSelector(
    (state) => state.articles.selectedArticle
  );
  useEffect(() => {    
    dispatch(getOneArticle(articleId));
  }, [dispatch, articleId])

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
