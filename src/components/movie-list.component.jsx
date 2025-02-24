import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get } from '../services/booking.service';
import { listMovies } from '../mocks/movie'
import '../styles/movie-list.css';


export const MovieList = () => {

    const [movies, setMovies] = useState(listMovies);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //       try {
    //         const data = await get('/movies');
    //         setMovies(data);
    //       } catch (error) {
    //         setError('Error al cargar las películas');
    //       }
    //     };

    //     fetchMovies();
    //   }, []);

    const selectMovie = (movie) => {
        return () => {
            navigate('/rooms', { state: { movie } });
        }
    }

    return (
        <main>
            <div className="container mt-5">
                <div className="row">
                    <h1 className='col-sm-12 col-lg-6 mt-2 mb-5'>Lista de Películas</h1>
                    <div className='col-sm-12 col-lg-6 mt-2 mb-5 btn-register'>
                        <Link to="/movies-register" >
                            <button
                                type="button"
                                className="btn btn-outline-primary mr-3"
                            >
                                Registrar nueva película
                            </button>
                        </Link>
                        <Link to="/rooms-register">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                            >
                                Registrar nueva sala
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {listMovies.map((movie, index) => {
                        const { title, genre, duration, classification } = movie;
                        return (
                            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-3">
                                <div className="card" key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">{title}</h5>
                                        <p className="card-text">Género: {genre}</p>
                                        <p className="card-text">Duración: {duration}m</p>
                                        <p className="card-text">Clasificación: {classification}</p>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={selectMovie(index, movie)}
                                        >
                                            Seleccionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}