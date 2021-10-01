import React, { useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { notificationActions } from "../../store/notification-slice";

import classes from "./EditArticleForm.module.css";

const EditArticleForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.selectedArticle); // the selected article for delete
  const userToken = useSelector((state) => state.user.token); // for authentication

  let title = useRef();
  let body = useRef();
  let image = useRef();

  if (article && title.current && body.current && image.current) {
    title.current.value = article.title;
    body.current.value = article.body;
    image.current.value = article.image;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const newArticle = {
      image: image.current.value,
      title: title.current.value,
      body: body.current.value,
    };

    try {
      const response = await fetch(
        `http://localhost:1339/article/${article._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newArticle),
        }
      );

      const data = await response.json();

      dispatch(
        notificationActions.showNotification({
          status: "success",
          message: data.message,
        })
      );

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

  return (
    <div className={classes.auth}>
      <h1>Edit Article</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" required ref={title} />
        </div>
        <div className={classes.control}>
          <label htmlFor="body">Body</label>
          <textarea id="body" required ref={body} />
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            placeholder="Link to image"
            required
            ref={image}
          />
        </div>

        <div className={classes.actions}>
          <button>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default EditArticleForm;
