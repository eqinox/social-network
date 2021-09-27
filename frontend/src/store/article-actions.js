import { articleActions } from "./article-slice";

export const getAllArticles = () => {
  return async (dispatch) => {
    const fetchArticles = async () => {
      const response = await fetch("http://localhost:1339/articles");
      if (!response.ok) {
        throw new Error("Could not fetch articles data");
      }

      console.log("articles data");
      const articles = await response.json();

      return articles;
    }

    try {
      const articles = await fetchArticles();
      dispatch(articleActions.getAll(articles));
    } catch (error) {
      console.log("Error with get all articles");
    }
  }
}