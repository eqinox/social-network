import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Button from "../UI/Button";
import { getOneArticle, getAllArticles } from "../../store/article-actions";

import classes from "./Article.module.css";
import { Link } from "react-router-dom";
import { notificationActions } from "../../store/notification-slice";

const Article = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const articleId = props.id;
  const publisher = props.owner.email;
  const month = props.publishingDate.toLocaleString("BG", { month: "long" });
  const day = props.publishingDate.toLocaleString("BG", { day: "2-digit" });
  const year = props.publishingDate.getFullYear();

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:1339/article/${articleId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${userToken}` } }
      );

      const data = await response.json();

      dispatch(
        notificationActions.showNotification({
          status: "success",
          message: data.message,
        })
      );
      dispatch(getAllArticles());
      history.replace("/welcome");
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          message: err.toString(),
        })
      );
    }
  };

  const editHandler = () => {
    dispatch(getOneArticle(articleId));
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
          <Link to={`/article/edit/${props.owner._id}`}>
            <Button type="button" onEdit={editHandler}>
              Edit
            </Button>
          </Link>
        )}
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
