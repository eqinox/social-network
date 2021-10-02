import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        href={props.href}
        className={classes.button}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={classes.button}
      >
        {props.children}
      </Link>
    )
  }
  const clickHandler = () => {
    if (props.children.toLowerCase().includes("back")) {
      props.onBackClick(); // come from AddArticlePage.js
    } else if (props.children.toLowerCase().includes("delete")) {
      props.onDelete(); // come from Article.js
    } else if (props.children.toLowerCase().includes("edit")) {
      props.onEdit();
    } else if (props.children.toLowerCase().includes("image")) {
      props.onImageUpload();
    }
  };

  return (
    <button
      type={props.type || "button"}
      className={classes.button}
      onClick={clickHandler}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
