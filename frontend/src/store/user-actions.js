import { userActions } from "./user-slice";
import { notificationActions } from "./notification-slice";

export const sendUserData = (newUser) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Sending data...",
        message: "Logging user",
      })
    );
    
    const fetchData = async () => {
      console.log(newUser);
      const response = await fetch("http://localhost:1339/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Could not fetch user data!");
      }
      
      console.log("user data");
      const data = await response.json();

      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Succes...",
          message: "Successfully logged in!",
        })
      );
      dispatch(userActions.login(userData));
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetchind user failed!",
        })
      );
    }
  };
};
