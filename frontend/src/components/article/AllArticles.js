import React from "react";

import Article from "./Article";

const AllArticles = () => {
  return (
    <div>
      <Article title={"Цецка Бачкова: ДБ ще има кандидат-президентска двойка"} publishingDate={new Date(2021, 2, 28)} />
    </div>
  );
};

export default AllArticles;
