import { articleActions } from "./article-slice";
import { notificationActions } from "./notification-slice";

export const getAllArticles = () => {
  return async (dispatch) => {
    const fetchArticles = async () => {
      const response = await fetch("http://localhost:1339/articles");
      if (!response.ok) {
        throw new Error("Could not fetch articles data");
      }

      const articles = await response.json();

      return articles;
    };

    try {
      const articles = await fetchArticles();
      dispatch(articleActions.getAll(articles));
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

export const deleteArticle = (articleId, userToken) => {
  return async (dispatch) => {
    const deletedArticle = async () => {
      const response = await fetch(
        `http://localhost:1339/articles/${articleId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (!response.ok) {
        throw new Error("Could not delete article");
      }

      const articles = await response.json();

      return articles;
    };
    
    try {
      const responseDeletedArticle = await deletedArticle();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          message: responseDeletedArticle.message,
        })
      );
      dispatch(getAllArticles());
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
