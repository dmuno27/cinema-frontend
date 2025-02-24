import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import roomData from "./room.json";

export const ReservationForm = (movie, room) => {

    console.log('Room Info: ', roomData);

    const selectedRoom = {
        "room": {
            "name": "SALA A",
            "capacity": 50
        },
        "seats": [
            {
                "row": "A",
                "seats": [1,2,3,4,5,6,7,8]
            },
            {
                "row": "B",
                "seats": [1,2,3,4,5,6,7,8,9,10,11]
            },
            {
                "row": "C",
                "seats": [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
            }
        ]
    }
    const selectedMovie = {
        
        'title': 'Avengers 1',
        'genre': 'Accion',
        'duration': '120min',
        'clasification': 'todos'
    }
    const selectedSchedule = {
        'hour': '5:30'
    }

    const columns = selectedRoom.seats.map((column) => {
        const rowsRoom = column.seats.length;
        // console.log('rowsRoom', rowsRoom)

    }
);
    const rows = selectedRoom.seats.length;
    const [selectedCells, setSelectedCells] = useState(
        Array.from({ length: rows }, () => Array(columns).fill(false))
    );
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]*$/;

    const navigate = useNavigate();

    const handleCellClick = (rowIndex, colIndex) => {
        const newSelected = selectedCells.map((row, rIdx) =>
            row.map((cell, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex ? !cell : cell
            )
        );
        setSelectedCells(newSelected);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = 'Ingrese un nombre valido'
        }
        if (!formData.email) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'El correo no es válido';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);
        // agregar sillas seleccionadas
        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulario enviado:', formData);
            sendReservationData(formData);
            handleAction()
        }
    };

    const handleAction = () => {
        // Envio de info al api
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigate('/movies');
        }, 3000);
    };

    const sendReservationData = (formData) => {
        const objectReservation = {
            "movie_programming_id": 1,
            "room_seat_id": 1,
            "customer_name": formData.name,
            "customer_email": formData.email
        }
        console.log(objectReservation)
        // service saveBooking()
        
    }

    return (
        <main>
            <div className='container mt-5'>
                <h1>Confirmar Reserva</h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                        <div className="container mt-4">
                            {
                                roomData.Seats.map((s, index) => {
                                    let currentRow = s.row;
                                    if (currentRow !== roomData.Seats[index+1]?.row) {
                                        console.log('cambia');
                                    }
                                    console.log('current:', currentRow);
                                    return (
                                        <div>
                                            
                                        </div>
                                    )
                                })
                                
                            }
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                        <h5>Pelicula</h5>
                        <span className='mt-2'>{selectedMovie.title}</span>
                        <h5 className='mt-3'>Sala</h5>
                        <span className='mt-2'>{selectedRoom.nameRoom}</span>
                        <h5 className='mt-3'>Horario</h5>
                        <span className='mt-2'>{selectedSchedule.hour}</span>

                        <form noValidate onSubmit={handleSubmit}>
                            <div className="mt-5 mb-3">
                                <label htmlFor="name" className="form-label">
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ingresar nombre de usuario"
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo Electrónico:
                                </label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="ejemplo@correo.com"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar reserva
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reservaciòn confirmada</h5>
                            </div>
                            <div className="modal-body">
                                <p>La reservaciòn se creo exitosamente. Redirigiendo...</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </div>
            )}
        </main>
    )
};