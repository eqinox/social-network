import { userActions } from "./user-slice";
import { notificationActions } from "./notification-slice";

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
      const response = await fetch(url, {
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

