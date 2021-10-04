import React from "react";

import { useSelector } from "react-redux";

import "./ProfilePage.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="profile">
      <h1>Welcome {user.email}!</h1>
    </section>
  );
};

export default ProfilePage;
