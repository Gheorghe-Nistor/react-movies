import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <p>{props.title}</p>
    </li>
  );
};

export default Movie;
