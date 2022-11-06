import React from 'react';

import classes from './Result.module.css';

const SearchResult = (props) => {
    const onClickHandler = () => {
        props.onClick(props.title);
    };
    return (
        <li className={classes.result} onClick={onClickHandler}>
            {props.title} <span>({props.year})</span>
        </li>
    );
};

export default SearchResult;
