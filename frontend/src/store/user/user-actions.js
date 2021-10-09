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
      if (userData.email) {
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
      } else {
        dispatch(
          notificationActions.showNotification({
            status: "error",
            message: userData.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          message: error.toString(),
        })
      );
    }
  };
};

export const addToFavourite = (articleId, userToken, action) => {
  return async (dispatch) => {
    const favouriteData = async () => {
      try {
        let url;
        if (action === "add") {
          url = "http://localhost:1339/user/add-favourite";
        } else if (action === "remove") {
          url = "http://localhost:1339/user/remove-favourite";
        }
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: articleId }),
        });

        return await response.json();
      } catch (error) {
        dispatch(
          notificationActions.showNotification({
            status: "error",
            message: error.toString(),
          })
        );
        return error;
      }
    };

    try {
      const favouriteResponseUser = await favouriteData();
      dispatch(userActions.addToFavourite(favouriteResponseUser.message));
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          message: error.toString(),
        })
      );
    }
  };
};


export const addNote = (noteText, userToken) => {
  return async (dispatch, getState) => {
    const noteData = async () => {
      try {
        const articleId = getState().articles.selectedArticle._id;
        const response = await fetch('http://localhost:1339/article/add-note', {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: articleId, text: noteText }),
        });

        return await response.json();
      } catch (error) {
        dispatch(
          notificationActions.showNotification({
            status: "error",
            message: error.toString(),
          })
        );
        return error;
      }
    };

    try {
      const noteResponse = await noteData();
      dispatch(userActions.addNote(noteResponse));
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          message: error.toString(),
        })
      );
    }
  };
};
