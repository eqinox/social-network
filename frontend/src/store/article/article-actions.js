import { articleActions } from "./article-slice";
import { notificationActions } from "../notification/notification-slice";

export const getAllArticles = () => {
  return async (dispatch) => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:1339/articles");

        const articles = await response.json();
        return articles;
      } catch (error) {
        return error;
      }
    };

    try {
      const articles = await fetchArticles();
      dispatch(articleActions.getAll(articles));
    } catch (error) {
      dispatch(
        notificationActions.showGlobalNotification({
          status: "error",
          message: error.toString(),
        })
      );
    }
  };
};

export const getOneArticle = (articleId) => {
  return async (dispatch) => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:1339/article/${articleId}`
        );

        return await response.json();
      } catch (error) {
        return error;
      }
    };

    try {
      const article = await fetchArticle();
      dispatch(articleActions.getSelected(article));
    } catch (error) {
      dispatch(
        notificationActions.showGlobalNotification({
          status: "error",
          message: error.toString(),
        })
      );
    }
  };
};
