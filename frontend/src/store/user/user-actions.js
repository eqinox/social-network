import { userActions } from "./user-slice";
import { notificationActions } from "../notification/notification-slice";

export const sendUserData = (newUser, action) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        message: "Logging user",
      })
    );
    let url;
    if (action === "register") {
      url = "http://localhost:1339/users/register";
    } else if (action === "login") {
      url = "http://localhost:1339/users/login";
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        return await response.json();
      } catch (error) {
        return error;
      }
    };

    try {
      const userData = await fetchData();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          message:
            action === "register"
              ? `Successfully registered and logged in ${userData.email}!`
              : `Successfully logged in ${userData.email}!`,
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
