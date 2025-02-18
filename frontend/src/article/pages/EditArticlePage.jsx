import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import EditArticleForm from "../components/EditArticleForm";
import Button from "../../shared/components/UI/Button";
import { getOneArticle } from "../../store/article/article-actions";
import { useParams } from "react-router-dom";

import classes from "./EditArticlePage.module.css";

const EditArticlePage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id: articleId } = useParams();

  const selectedArticle = useSelector(
    (state) => state.articles.selectedArticle
  );
  useEffect(() => {
    dispatch(getOneArticle(articleId));
  }, [dispatch, articleId]);

  const goBackHandler = () => {
    history(-1);
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
