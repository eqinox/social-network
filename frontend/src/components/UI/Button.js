import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const clickHandler = () => {
    if (props.children.toLowerCase().includes("back")) {
      props.onBackClick(); // come from AddArticlePage.js
    } else if (props.children.toLowerCase().includes("delete")) {
      props.onDelete(); // come from Article.js
    } else if (props.children.toLowerCase().includes("edit")) {
      props.onEdit();
    }
  };

  return (
    <button
      type={props.type || "button"}
      className={classes.button}
      onClick={clickHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
