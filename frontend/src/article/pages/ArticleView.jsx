import { useEffect, useState } from "react";

import Button from "../../shared/components/UI/Button";
import { useSelector, useDispatch } from "react-redux";
import { addToFavourite, addNote } from "../../store/user/user-actions";
import { getOneArticle } from "../../store/article/article-actions";

import { useParams } from "react-router-dom";

import "./ArticleView.css";

const ArticleView = () => {
  const dispatch = useDispatch();
  const { id: articleId } = useParams();

  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.user.token);
  const article = useSelector((state) => state.articles.selectedArticle);
  const userFavourite = useSelector((state) => state.user.favourite);
  const smallNotification = useSelector(
    (state) => state.notification.smallNotification
  );
  console.log(smallNotification);
  const [noteText, setNoteText] = useState();

  const title = article ? article.title : "Unknown";
  const body = article ? article.body : "Missing information";
  const author = article ? article.owner.email : "Unknown";
  const image = article ? article.image : "Unknown";

  // Get note data
  useEffect(() => {
    if (article && user.notes.some((item) => item.article === article._id)) {
      const index = user.notes.findIndex(
        (item) => item.article === article._id
      );
      setNoteText(user.notes[index].text);
    }
  }, [article]);

  // send note text on every note change
  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(addNote(noteText, userToken));
    }, 1000);

    // cleanup function
    return () => {
      clearTimeout(identifier);
    };
  }, [noteText]);

  // on startup
  useEffect(() => {
    dispatch(getOneArticle(articleId));
  }, [dispatch, articleId]);

  const favouriteHandler = () => {
    if (userFavourite.includes(articleId)) {
      dispatch(addToFavourite(articleId, userToken, "remove"));
    } else {
      dispatch(addToFavourite(articleId, userToken, "add"));
    }
  };

  let favouriteText;
  if (userFavourite.includes(articleId)) {
    favouriteText = "Remove from favourite";
  } else {
    favouriteText = "Add to favourite";
  }

  const changeNoteHandler = (event) => {
    setNoteText(event.target.value);
  };

  return (
    <div className="container">
      <div className="info">
        <div className="image">
          <img alt="something" src={`http://localhost:1339/${image}`} />
        </div>
        <div className="body">
          <h1>{title}</h1>
          <i>created by: {author}</i>
          <p>{body}</p>
          <div className="favourite">
            <Button
              onAddToFavourite={favouriteHandler}
              favourite
              isInFavourite={
                userFavourite ? userFavourite.includes(articleId) : null
              }
            >
              {favouriteText}
            </Button>
          </div>
        </div>
      </div>
      <div className="review">SomeReview</div>
      <div className="comments">
        <textarea
          value={noteText}
          onChange={changeNoteHandler}
          placeholder="Your private notes and comments about the movie"
        />
        <p className={`saveNote ${smallNotification ? "show" : "hide"}`}>
          Note Saved
        </p>
      </div>
    </div>
  );
};

export default ArticleView;
