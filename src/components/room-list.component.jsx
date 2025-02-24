import React from 'react';
import { Link } from 'react-router';

export const RoomList = (movie) => {

    const roomsList = [
        {
            'nameRoom': 'Sala A',
            'capacity': '30'
        },
        {
            'nameRoom': 'Sala B',
            'capacity': '30'
        },

    ];

    const selectedMovie = {
        'title': 'Avengers 1',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    }

    return (
        <main>
            <div className="container mt-5">
                <h1>Lista de Salas</h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{selectedMovie.title}</h5>
                                <p className="card-text">{selectedMovie.title}</p>
                                <p className="card-text">{selectedMovie.duration}</p>
                                <p className="card-text">{selectedMovie.clasification}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        {roomsList.map((room) => {
                            return (
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{room.nameRoom}</h5>
                                        <Link to="/reservations" >
                                            <button className="btn btn-primary">Seleccionar sala</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })

                        }
                    </div>
                </div>
            </div>
        </main>
    )
}