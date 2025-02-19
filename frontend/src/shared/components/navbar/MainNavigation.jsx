import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user/user-slice";

import "./MainNavigation.css";
import { notificationActions } from "../../../store/notification/notification-slice";

const MainNavigation = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.email);
  const favourite = useSelector((state) => state.user.favourite);

  const logoutHandler = () => {
    dispatch(userActions.logout());

    dispatch(
      notificationActions.showGlobalNotification({
        show: true,
        message: `Successfully logged out ${user}!`,
        status: "success",
        title: "logout",
      })
    );

    history("/auth", { replace: true });
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">React Auth</div>
      </Link>

      <nav>
        <ul>
          <li>
            <button id="favourite-button">{favourite.length}</button>
          </li>
          <li>{!isLoggedIn && <Link to="/auth">Login</Link>}</li>
          <li>{isLoggedIn && <Link to="/profile">Profile</Link>}</li>
          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
