import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
    return (
        <li className={classes.movie}>
            <p className={classes.title}>
                {props.title} ({props.year})
            </p>
            <img src={props.poster} alt="movie poster" />
            <div className={classes.details}>
                <p>
                    {props.rating} <img src="/star.svg" alt="star" />
                </p>
                <p>{props.runTime}</p>
            </div>
        </li>
    );
};

export default Movie;
