import React from "react";

import classes from "./Article.module.css";

const Article = (props) => {
  const month = props.publishingDate.toLocaleString("BG", { month: "long" });
  const day = props.publishingDate.toLocaleString("BG", { day: "2-digit" });
  const year = props.publishingDate.getFullYear();

  return (
    <div className={classes.article}>
        <img alt="Image" src="https://thumbs.dreamstime.com/b/cat-avatar-illustration-cartoon-45383590.jpg"/>
        <div className={classes.title}>{props.title}</div>
        <div className={classes['date-elements']}>
          <p>{day}</p>
          <p>{month}</p>
          <p>{year}</p>
        </div>
        <div className={classes.text}>
        "Демократична България" ще има кандидат-президентска двойка. Обсъждат се кандидатури, водят се разговори, все пак обединението е...
        </div>
    </div>
  );
};

export default Article;
