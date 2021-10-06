import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  const isFavourite = props.favourite;
  let isInFavourite = isFavourite ? props.isInFavourite : null;

  if (props.href) {
    return (
      <a href={props.href} className="button">
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className="button">
        {props.children}
      </Link>
    );
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
    } else if (props.children.toLowerCase().includes("favourite")) {
      props.onAddToFavourite();
    }
  };
  let button;
  if (isFavourite) {
    button = (
      <button
        type={props.type || "button"}
        className={`button ${isInFavourite ? "favourite-in" : "favourite-out"}`}
        onClick={clickHandler}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  } else {
    button = (
      <button
        type={props.type || "button"}
        className="button"
        onClick={clickHandler}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }

  return button;
};

export default Button;
