import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../store/article/article-actions";

import Article from "./Article";
import "./AllArticles.css";

const AllArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles).all;

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);

  return (
    <div className="all-articles">
      {articles.map((article) => (
        <Article
          title={article.title}
          publishingDate={new Date(article.publishedDate)}
          body={article.body}
          image={
            article.image
              ? `http://localhost:1339/${article.image}`
              : "https://cdn.britannica.com/q:60/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg"
          }
          key={article._id}
          id={article._id}
          owner={article.owner}
        />
      ))}
    </div>
  );
};

export default AllArticles;
