import React, { Fragment, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Notification from "./shared/components/UI/Notification";

import AuthForm from "./user/AuthForm";
import { notificationActions } from "./store/notification/notification-slice";
import MainNavigation from "./shared/components/navbar/MainNavigation";
import StartingPage from "./shared/components/StartingPage/StartingPage";
import AddArticlePage from "./article/pages/AddArticlePage";
import EditArticlePage from "./article/pages/EditArticlePage";
import ProfilePage from "./user/ProfilePage";

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
            <ProfilePage />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthForm />
          </Route>
        )}

        {isLoggedIn && (
          <Route path="/articles/add">
            <AddArticlePage />
          </Route>
        )}

        {isLoggedIn && (
          <Route path="/article/edit/:id" component={EditArticlePage} />
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
