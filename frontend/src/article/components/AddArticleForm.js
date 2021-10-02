import React, { useCallback, useReducer } from "react";

import classes from "./AddArticleForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notification/notification-slice";
import { useHistory } from "react-router-dom";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";

import Input from "../../shared/components/UI/Input";
import Button from "../../shared/components/UI/Button";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const AddArticleForm = () => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.user.token);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    const newArticle = {
      image: null,
      title: formState.inputs.title.value,
      body: formState.inputs.body.value,
    };

    try {
      const response = await fetch("http://localhost:1339/article/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(newArticle),
      });

      const data = await response.json();

      dispatch(
        notificationActions.showNotification({
          message: data.message,
          status: "success",
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

  const inputHandler = useCallback((id, value, isValid) => {
    dispatchFormState({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  return (
    <div className={classes.auth}>
      <h1>Add Article</h1>
      <form onSubmit={submitHandler}>
        <Input
          element="input"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid title"
          id="title"
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          label="body"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)"
          id="body"
          onInput={inputHandler}
        />
        {/* <div className={classes.control}>
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
          <ImageUpload id="image" />
        </div> */}

        <div className={classes.actions}>
          <Button type="submit" disabled={!formState.isValid}>
            Add Article
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleForm;
