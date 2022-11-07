import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MoviesList = (props) => {
    console.log(props);
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
                />
            ))}
        </ul>
    );
};

export default MoviesList;
