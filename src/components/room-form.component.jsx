import React, { useEffect, useState } from 'react';
import '../styles/room-form.css';
import { useNavigate } from 'react-router-dom';

export const RoomForm = () => {

    const [nombre, setNombre] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [fila, setFila] = useState('');
    const [columnas, setColumnas] = useState('');
    const [filasConColumnas, setFilasConColumnas] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        if (filasConColumnas.length > 0) {
            setDisabled(false);
        }
    }, [filasConColumnas]);

    const addRow = () => {
        if (!fila || !columnas) {
            alert('Por favor, ingresa la fila y el número de columnas.');
            return;
        }

        const nuevaFila = {
            fila: fila,
            columnas: parseInt(columnas)
        };

        setFilasConColumnas(prevFilas => [...prevFilas, nuevaFila]);

        setFila('');
        setColumnas('');
    };

    const handlerRoomForm = (e) => {
        e.preventDefault();

        if (!nombre || !capacidad) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const nuevaSala = {
            nombre,
            capacidad,
            distribucion: filasConColumnas
        };

        setSalas([...salas, nuevaSala]);

        navigate('/rooms');
        setNombre('');
        setCapacidad('');
        setFilasConColumnas([]);

    };

    return (
        <div className="container mt-5">
            <h3 className="mt-5 mb-5">Registro de Sala de Cine</h3>
            <form onSubmit={handlerRoomForm} className="mt-4">

                <div className="form-group mt-4">
                    <label htmlFor="nombre">Nombre de la sala:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mt-4">
                    <label htmlFor="capacidad">Capacidad:</label>
                    <input
                        type="number"
                        id="capacidad"
                        name="capacidad"
                        className="form-control"
                        value={capacidad}
                        onChange={(e) => setCapacidad(e.target.value)}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <div className="form-group mt-4">
                            <label htmlFor="fila">Fila:</label>
                            <input
                                type="text"
                                id="fila"
                                name="fila"
                                className="form-control"
                                value={fila}
                                onChange={(e) => setFila(e.target.value)}
                                placeholder="Ejemplo: A, B, C"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <div className="form-group mt-4">
                            <label htmlFor="columnas">Número de sillas:</label>
                            <input
                                type="number"
                                id="columnas"
                                name="columnas"
                                className="form-control"
                                value={columnas}
                                onChange={(e) => setColumnas(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 btn-add-row">
                        <div className="text-center mt-4">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={addRow}
                            >
                                Agregar Fila
                            </button>
                        </div>
                    </div>

                </div>
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary" disabled={disabled}>
                        Registrar Sala
                    </button>
                </div>
            </form>

            {filasConColumnas.length > 0 && (
                <div className="mt-4">
                    <h5>Filas Agregadas:</h5>
                    <ul className="list-group">
                        {filasConColumnas.map((item, index) => (
                            <li key={index} className="list-group-item">
                                Fila {item.fila.toUpperCase()} - Sillas: {item.columnas}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

