import React, { useState, useEffect, useRef } from 'react';
import { useImperativeHandle } from 'react';

import classes from './Search.module.css';

const Search = React.forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        if (inputValue === '') return;
        const intervalID = setTimeout(() => {
            console.log(inputValue);
        }, 750);
        return () => {
            clearTimeout(intervalID);
        };
    }, [inputValue]);
    const movieTitleRef = useRef('');
    const submitHandler = async (event) => {
        event.preventDefault();
        const movie = {
            title: inputValue
        };
        movieTitleRef.current.value = '';
        props.changeIsToggle(!props.isToggle);
        props.onAddMovie(movie);
    };
    useImperativeHandle(ref, () => {
        return {
            value: (newValue) => {
                movieTitleRef.current.value = newValue;
                setInputValue(newValue);
            }
        };
    });
    return (
        <form onSubmit={submitHandler} className={classes.search}>
            <label htmlFor="movieTitle">Title</label>
            <input
                type="text"
                id="movieTitle"
                autoComplete="off"
                ref={movieTitleRef}
                onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button disabled={inputValue === ''} onClick={submitHandler}>
                Add Movie
            </button>
        </form>
    );
});

export default Search;
