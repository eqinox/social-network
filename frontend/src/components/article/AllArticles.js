import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../../store/article-actions";

import Article from "./Article";

const AllArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles).all;

  useEffect(() => {
    dispatch(getAllArticles());
  }, [])
  
  return (
    <div>
      {articles.map((article) => (
        <Article
          title={article.title}
          publishingDate={new Date(article.publishedDate)}
          body={article.body}
          image={article.image}
          key={article._id}
          id={article._id}
          owner={article.owner}
        />
      ))}
    </div>
  );
};

export default AllArticles;
