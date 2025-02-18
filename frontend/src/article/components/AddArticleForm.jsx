import { useRef } from "react";

import classes from "./AddArticleForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notification/notification-slice";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/components/UI/ImageUpload";

const AddArticleForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userToken = useSelector((state) => state.user.token);
  let image;

  let title = useRef();
  let body = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title.current.value);
    formData.append("body", body.current.value);

    try {
      const response = await fetch("http://localhost:1339/article/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      dispatch(
        notificationActions.showGlobalNotification({
          message: data.message,
          status: "success",
        })
      );

      history("/welcome", { replace: true });
    } catch (err) {
      dispatch(
        notificationActions.showGlobalNotification({
          status: "error",
          message: err.toString(),
        })
      );
    }
  };

  const imageHandler = (incomingImage) => {
    image = incomingImage;
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
        <ImageUpload onImageUpload={imageHandler} />
        <div className={classes.actions}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleForm;
