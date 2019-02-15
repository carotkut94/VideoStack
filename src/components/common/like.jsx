import React from "react";

// for liking a movie. ti will be based on boolean
const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      className={classes}
      onClick={props.onLikedClicked}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
