import React, { useState, useRef } from 'react';

import Search from './Search';
import Result from './Result';
import classes from './AddMovie.module.css';

const AddMovie = (props) => {
    const [isToggle, setIsToggle] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef();
    const changeIsToggle = (newState) => {
        setIsToggle((oldState) => newState);
    };
    const toggleSwitch = () => {
        setIsToggle(!isToggle);
    };
    const addMovieHandler = (movieID) => {
        setSearchResults([]);
        props.onAddMovie(movieID);
    };
    const onClickResultHandler = (title) => {
        searchInputRef.current.value(title);
    };
    const searchMovieHandler = (title) => {
        async function fetchData(title) {
            const response = await fetch(
                `https://imdb-api.com/en/API/SearchMovie/k_u3396u68/${title}`
            );
            const data = await response.json();
            const tempArr = [];
            for (let i = 0; i < 3; i++) {
                const tempMovie = data.results[i];
                tempArr.push({
                    id: tempMovie.id,
                    title: tempMovie.title,
                    year: tempMovie.description.split(' ')[0]
                });
            }
            setSearchResults(tempArr);
        }
        fetchData(title);
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
                        searchMovie={searchMovieHandler}
                        searchResults={searchResults}
                    />
                    {searchResults.map((movie) => (
                        <Result
                            id={movie.id}
                            key={Math.random()}
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
