import React, { useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { editArticle } from "../../store/article-actions";

import classes from "./EditArticleForm.module.css";

const EditArticleForm = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.selectedArticle);
  const userToken = useSelector((state) => state.user.token);
  let title = useRef();
  let body = useRef();
  let image = useRef();

  if (article) {
    title.current.value = article.title;
    body.current.value = article.body;
    image.current.value = article.image;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const newArticle = {
      image: image.current.value,
      title: title.current.value,
      body: body.current.value,
    };
    dispatch(editArticle(article._id, newArticle, userToken));
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
