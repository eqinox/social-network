import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";

export const sendUserData = (newUser) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
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
        uiActions.showNotification({
          status: "success",
          title: "Succes...",
          message: "Successfully logged in!",
        })
      );
      dispatch(authActions.login(userData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetchind user failed!",
        })
      );
    }
  };
};
