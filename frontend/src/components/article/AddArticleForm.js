import React, { useRef } from "react";

import classes from "./AddArticle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notification-slice";
import { useHistory } from "react-router-dom";

const AddArticleForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.user.token);

  let title = useRef();
  let body = useRef();
  let image = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const newArticle = {
      image: image.current.value,
      title: title.current.value,
      body: body.current.value,
    };

    fetch("http://localhost:1339/articles/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(newArticle),
    }).then((response) => {
      if (response.status !== 200) {
        return dispatch(
          notificationActions.showNotification({
            message: response.statusText,
            status: response.status,
          })
        );
      }
      history.replace("/welcome");

      dispatch(
        notificationActions.showNotification({
          message: "Successfuly added",
          status: response.status,
        })
      );
    });
  };

  return (
    <div className={classes.auth}>
      <h1>Add Article</h1>
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
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleForm;
