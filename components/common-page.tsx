import React from "react";

const CommonPage = ({ id }) => {
  return (
    <div>
      <h1>{id ? `Page for ID: ${id}` : "Page without ID"}</h1>
    </div>
  );
};

export default CommonPage;
