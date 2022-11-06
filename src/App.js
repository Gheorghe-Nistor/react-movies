import React, { useState, useEffect } from 'react';

import './App.css';
import Header from './components/UI/Header';
import AddMovie from './components/Add/AddMovie';
import MoviesList from './components/List/MoviesList';

function App() {
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                'https://react-movies-01-default-rtdb.firebaseio.com/movies.json'
            );
            const data = await response.json();
            setMoviesList(
                Object.values(data).reduce((acc, el) => {
                    acc.push({ title: el.title });
                    return acc;
                }, [])
            );
        }
        fetchData();
    }, []);

    const addMovieHandler = async (movie) => {
        setMoviesList((oldMoviesList) => [...oldMoviesList, movie]);
        const response = await fetch(
            'https://react-movies-01-default-rtdb.firebaseio.com/movies.json',
            {
                method: 'POST',
                body: JSON.stringify(movie),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    };
    return (
        <>
            <Header />
            <AddMovie onAddMovie={addMovieHandler} />
            <section>
                <MoviesList movies={moviesList} />
            </section>
        </>
    );
}

export default App;
