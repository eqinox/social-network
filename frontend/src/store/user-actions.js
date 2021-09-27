import { userActions } from "./user-slice";
import { notificationActions } from "./notification-slice";

export const sendLoginUserData = (newUser) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        message: "Logging user",
      })
    );

    const fetchData = async () => {
      const response = await fetch("http://localhost:1339/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Could not fetch user data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          message: "Successfully logged in!",
        })
      );
      dispatch(userActions.login(userData));
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          message: "Fetchind user failed!",
        })
      );
    }
  };
};

export const sendRegisterUserData = (newUser) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        message: "Logging user",
      })
    );

    const fetchData = async () => {
      const response = await fetch("http://localhost:1339/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Could not fetch user data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      await fetchData();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          message: "Successfully Registered!",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        notificationActions.showNotification({
          status: "error",
          message: "Fetchind user failed!",
        })
      );
    }
  };
};
