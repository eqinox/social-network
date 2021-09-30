import React, { Fragment, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Notification from "./components/UI/Notification";

import AuthForm from "./components/user/AuthForm";
import { notificationActions } from "./store/notification-slice";
import MainNavigation from "./components/navbar/MainNavigation";
import StartingPage from "./components/StartingPage/StartingPage";
import AddArticlePage from "./components/article/AddArticlePage";
import EditArticlePage from "./components/article/EditArticlePage";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideNotification());
    }, 5000);
  }, [notification, dispatch]);

  return (
    <Fragment>
      <MainNavigation />
      {notification.show && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome">
          <StartingPage />
        </Route>

        {isLoggedIn && (
          <Route path="/profile">
            <StartingPage />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthForm />
          </Route>
        )}

        <Route path="/articles/add">
          <AddArticlePage />
        </Route>

        <Route path="/article/edit/:id" component={EditArticlePage} />

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
