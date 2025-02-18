import { Fragment, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Notification from "./shared/components/UI/Notification";

import AuthForm from "./user/AuthForm";
import { notificationActions } from "./store/notification/notification-slice";
import MainNavigation from "./shared/components/navbar/MainNavigation";
import StartingPage from "./shared/components/StartingPage/StartingPage";
import AddArticlePage from "./article/pages/AddArticlePage";
import EditArticlePage from "./article/pages/EditArticlePage";
import ProfilePage from "./user/ProfilePage";
import ArticleView from "./article/pages/ArticleView";

const App = () => {
  const dispatch = useDispatch();
  const bigNotification = useSelector((state) => state.notification);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const smallNotification = useSelector(
    (state) => state.notification.smallNotification
  );

  // hide small notifications
  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideSmallNotification());
    }, 2500);
  }, [smallNotification, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideGlobalNotification());
    }, 5000);
  }, [bigNotification, dispatch]);

  return (
    <Fragment>
      <MainNavigation />
      {bigNotification.show && (
        <Notification
          status={bigNotification.status}
          title={bigNotification.title}
          message={bigNotification.message}
        />
      )}
      <Routes>
        <Route path="/" exact element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<StartingPage />} />

        {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
        {!isLoggedIn && <Route path="/auth" element={<AuthForm />} />}

        {isLoggedIn && (
          <Route path="/articles/add" element={<AddArticlePage />} />
        )}

        {isLoggedIn && (
          <Route path="/article/edit/:id" element={<EditArticlePage />} />
        )}

        <Route path="/article/view/:id" element={<ArticleView />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Fragment>
  );
};

export default App;
