import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import Header from './components/UI/Header';
import AddMovie from './components/Add/AddMovie';
import MoviesList from './components/List/MoviesList';
import Modal from './components/UI/Modal';

function App() {
    const [moviesList, setMoviesList] = useState([]);
    const [trailerIsShown, setTrailerIsShown] = useState(false);
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
    const trailerLink = useRef(0);
    const openTrailerHandler = (link) => {
        console.log('link' + link);
        trailerLink.current = link;
        setTrailerIsShown(true);
    };
    const closeTrailerHandler = () => {
        setTrailerIsShown(false);
    };
    return (
        <>
            <Header />
            <AddMovie onAddMovie={addMovieHandler} />
            <MoviesList movies={moviesList} openTrailer={openTrailerHandler} />
            {trailerIsShown && (
                <Modal onClose={closeTrailerHandler}>
                    <iframe
                        src={`${trailerLink.current}?autoplay=false&width=854`}
                        width={854}
                        height={480}
                        title="movie trailer"
                        allowFullScreen={true}
                        mozallowfullscreen="true"
                        webkitallowfullscreen="true"
                        frameBorder="no"
                        scrolling="no"
                    ></iframe>
                </Modal>
            )}
        </>
    );
}

export default App;
