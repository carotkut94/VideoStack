import React, { Component } from "react";

// for liking a movie. ti will be based on boolean

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return <i className={classes} aria-hidden="true" />;
  }
}

export default Like;
