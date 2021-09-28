import React from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";

import classes from "./Article.module.css";

const Article = (props) => {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const month = props.publishingDate.toLocaleString("BG", { month: "long" });
  const day = props.publishingDate.toLocaleString("BG", { day: "2-digit" });
  const year = props.publishingDate.getFullYear();

  const deleteHandler = () => {
    fetch("http://localhost:1339/articles/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: props.id }),
    })
      .then((data) => {
        console.log("from Articles.js success");
        console.log(data);
      })
      .catch((error) => {
        console.log("from Articles.js error");
        console.log(error);
      });
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
      <div className={classes.actions}>
        {userId === props.owner && (
          <Button type="button" onDelete={deleteHandler}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default Article;
