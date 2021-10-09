import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Button from "../shared/components/UI/Button";
import {
  getOneArticle,
  getAllArticles,
} from "../store/article/article-actions";

import "./Article.css";
import { Link } from "react-router-dom";
import { notificationActions } from "../store/notification/notification-slice";
import { addToFavourite } from "../store/user/user-actions";

const Article = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userFavourite = useSelector((state) => state.user.favourite);
  const userToken = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const articleId = props.id;
  const publisher = props.owner.email;
  const month = props.publishingDate.toLocaleString("BG", { month: "long" });
  const day = props.publishingDate.toLocaleString("BG", { day: "2-digit" });
  const year = props.publishingDate.getFullYear();
  const isInFavourite = userFavourite
    ? userFavourite.includes(articleId)
    : null;

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

  const favouriteHandler = () => {
    if (userFavourite.includes(articleId)) {
      dispatch(addToFavourite(articleId, userToken, "remove"));
    } else {
      dispatch(addToFavourite(articleId, userToken, "add"));
    }
  };

  let favouriteText;
  if (userFavourite.includes(articleId)) {
    favouriteText = "Remove from favourite";
  } else {
    favouriteText = "Add to favourite";
  }

  return (
    <div className="article">
      <Link to={`/article/view/${articleId}`}>
        <img alt="something" src={props.image} />
      </Link>
      <div className="title">{props.title}</div>
      <div className="date-elements">
        <p>{day}</p>
        <p>{month}</p>
        <p>{year}</p>
      </div>
      <div className="text">{props.body.substring(0, 50)}</div>
      <div className="author">Author: {publisher}</div>
      <div className="actions">
        <button
          onClick={favouriteHandler}
          className={`${isInFavourite ? "favourite-in" : "favourite-out"}`}
        >
          {favouriteText}
        </button>
        {userId === props.owner._id && (
          <Link to={`/article/edit/${props.id}`}>
            <button type="button" onClick={editHandler}>
              Edit
            </button>
          </Link>
        )}
        {userId === props.owner._id && (
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Article;
