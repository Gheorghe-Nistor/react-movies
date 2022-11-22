import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MoviesList = (props) => {
    const openTrailerHandler = (link) => {
        props.openTrailer(link);
    };
    return (
        <ul className={classes['movies-list']}>
            {props.movies.map((movie) => (
                <Movie
                    key={movie.id}
                    title={movie.title}
                    year={movie.year}
                    rating={movie.rating}
                    poster={movie.poster}
                    runTime={movie.runTime}
                    trailer={movie.trailer}
                    openTrailer={openTrailerHandler}
                />
            ))}
        </ul>
    );
};

export default MoviesList;
