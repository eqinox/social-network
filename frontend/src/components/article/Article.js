import React from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";

import { useDispatch } from "react-redux";
import { deleteArticle } from "../../store/article-actions";

import classes from "./Article.module.css";

const Article = (props) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const articleId = props.id;
  const publisher = props.owner.email;
  const month = props.publishingDate.toLocaleString("BG", { month: "long" });
  const day = props.publishingDate.toLocaleString("BG", { day: "2-digit" });
  const year = props.publishingDate.getFullYear();

  const deleteHandler = () => {
    dispatch(deleteArticle(articleId, userToken));
  };

  return (
    <div className={classes.article}>
      <img alt="something" src={props.image} />
      <div className={classes.title}>{props.title}</div>
      <div className={classes["date-elements"]}>
        <p>{day}</p>
        <p>{month}</p>
        <p>{year}</p>
      </div>
      <div className={classes.text}>{props.body}</div>
      <div>Author: {publisher}</div>
      <div className={classes.actions}>
        {userId === props.owner._id && (
          <Button type="button" onDelete={deleteHandler}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default Article;
