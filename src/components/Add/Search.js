import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';

import classes from './Search.module.css';

const Search = React.forwardRef((props, ref) => {
    const [disabledButton, setDisabledButton] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const movieTitleRef = useRef('');
    const movieID = useRef(0);
    useEffect(() => {
        if (inputValue.length < 2) return;
        const intervalID = setTimeout(() => {
            props.searchMovie(inputValue);
        }, 700);
        return () => {
            clearTimeout(intervalID);
        };
    }, [inputValue]);
    useEffect(() => {
        if (inputValue === '') return;
        const intervalID = setTimeout(() => {
            const found = props.searchResults.find(
                (element) =>
                    inputValue.toLowerCase() === element.title.toLowerCase()
            );
            if (found !== undefined) movieID.current = found.id;
            setDisabledButton(found === undefined);
        }, 250);
        return () => {
            clearTimeout(intervalID);
        };
    }, [inputValue, props.searchResults]);
    const submitHandler = async (event) => {
        event.preventDefault();
        movieTitleRef.current.value = '';
        props.changeIsToggle(!props.isToggle);
        props.onAddMovie(movieID.current);
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
                placeholder="search movie here..."
                ref={movieTitleRef}
                onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button disabled={disabledButton} onClick={submitHandler}>
                Add Movie
            </button>
        </form>
    );
});

export default Search;
