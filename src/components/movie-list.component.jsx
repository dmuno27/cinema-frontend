import React from 'react';
import { Link } from 'react-router';

const listMovies = [
    {
        'title': 'Avengers 1',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    },
    {
        'title': 'Avengers 2',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    },
    {
        'title': 'Avengers 3',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    },
    {
        'title': 'Avengers 1',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    },
    {
        'title': 'Avengers 2',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    },
    {
        'title': 'Avengers 3',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    },

];

export const MovieList = () => {

    return (
        <main>
            <div className="container mt-5">
                <h1 className='mt-2 mb-5'>Lista de Peliculas</h1>
                <div className="row">
                    {listMovies.map((movie, index) => {
                        return (
                            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-3">
                                <div className="card" key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">{movie.title}</p>
                                        <p className="card-text">{movie.duration}</p>
                                        <p className="card-text">{movie.clasification}</p>
                                        <Link to="/rooms" >
                                            <button className="btn btn-primary">Seleccionar</button>
                                        </Link>
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