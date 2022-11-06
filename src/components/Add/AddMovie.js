import React, { useState, useRef } from 'react';

import Search from './Search';
import Result from './Result';
import classes from './AddMovie.module.css';

const AddMovie = (props) => {
    const [isToggle, setIsToggle] = useState(false);
    const [searchResults, setSearchResults] = useState([
        { id: '1', title: 'Avengers: Infinity War', year: '2018' },
        { id: '2', title: 'Avengers: Endgame', year: '2019' }
    ]);
    const searchInputRef = useRef();
    const changeIsToggle = (newState) => {
        setIsToggle((oldState) => newState);
    };
    const toggleSwitch = () => {
        setIsToggle(!isToggle);
    };
    const addMovieHandler = (movie) => {
        props.onAddMovie(movie);
    };
    const onClickResultHandler = (title) => {
        searchInputRef.current.value(title);
    };
    return (
        <div className={classes.control}>
            {isToggle && (
                <>
                    <Search
                        isToggle={isToggle}
                        changeIsToggle={changeIsToggle}
                        onAddMovie={addMovieHandler}
                        ref={searchInputRef}
                    />
                    {searchResults.map((movie) => (
                        <Result
                            id={movie.id}
                            title={movie.title}
                            year={movie.year}
                            onClick={onClickResultHandler}
                        />
                    ))}
                </>
            )}
            {!isToggle && <button onClick={toggleSwitch}>Add New Movie</button>}
        </div>
    );
};

export default AddMovie;
