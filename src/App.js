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
                    acc.push({
                        id: el.id,
                        title: el.title,
                        year: el.year,
                        rating: el.rating,
                        poster: el.poster,
                        runTime: el.runTime,
                        trailer: el.trailer
                    });
                    return acc;
                }, [])
            );
        }
        fetchData();
    }, []);
    console.log(moviesList);
    const addMovieHandler = async (movieId) => {
        const response = await fetch(
            `https://imdb-api.com/en/API/Title/k_u3396u68/${movieId}/Posters,Trailer,Ratings`
        );
        const data = await response.json();
        const movie = {
            id: data.id,
            title: data.title,
            year: data.year,
            rating: data.imDbRating,
            poster: data.image,
            runTime: data.runtimeStr,
            trailer: data.trailer.linkEmbed
        };
        setMoviesList((oldMoviesList) => [...oldMoviesList, movie]);
        await fetch(
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
            <MoviesList movies={moviesList} />
        </>
    );
}

export default App;
