import React from 'react';

import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.container}>
            <div className={classes['background-img']}></div>
            <div className={classes.text}>
                <h1>Hi, I'm George!</h1>
                <p>
                    This is my list of movies that must be seen in this{' '}
                    <strong>lifetime</strong>. <br /> You can also contribute by
                    adding some. Enjoy!
                </p>
            </div>
        </div>
    );
};

export default Header;
