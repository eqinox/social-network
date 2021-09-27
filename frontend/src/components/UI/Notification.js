import React from "react";
import classes from "./Notification.module.css";

const Notification = (props) => {
  let specialClasses = "";

  const status = parseInt(props.status);
  if (Number.isInteger(status)) {
    if (status >= 300 && status <= 600) {
      specialClasses = classes.error;
    } else if (status >= 0 && status <= 299) {
      specialClasses = classes.success;
    }
  } else {
    if (props.status === "error") {
      specialClasses = classes.error;
    }
    if (props.status === "success") {
      specialClasses = classes.success;
    }
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.message}</h2>
    </section>
  );
};

export default Notification;
