import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MoviesList = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie key={Math.random()} title={movie.title} />
      ))}
    </ul>
  );
};

export default MoviesList;
