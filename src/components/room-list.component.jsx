import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { roomList } from '../mocks/room'

export const RoomList = () => {

    const location = useLocation();
    const { movie } = location.state || {};

    const navigate = useNavigate();

    const selectRoom = (room) => {
        return () => {
            navigate('/booking', { state: { movie, room } });
        }
    }

    return (
        <main>
            <div className="container mt-5">
                <h1 className='col-sm-12 col-lg-6 mt-2 mb-5'>Lista de Salas</h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">Género: {movie.genre}</p>
                                <p className="card-text">Duración: {movie.duration}</p>
                                <p className="card-text">Clasificación: {movie.classification}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        {roomList.map((room, index) => {
                            return (
                                <div className="card" key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">{room.room.name}</h5>
                                        <p className="card-title">{room.room.movieProgramming }</p>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={selectRoom(room)}
                                        >
                                            Seleccionar
                                        </button>
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