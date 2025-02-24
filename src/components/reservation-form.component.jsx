import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import roomData from "../mocks/room.json";
import '../styles/reservation-form.css';
import { useLocation } from 'react-router-dom';

export const ReservationForm = () => {

    const location = useLocation();
    const { movie, room } = location.state || {};
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]*$/;
    const navigate = useNavigate();
    
    const rows = room.seats.map((row) => row.length);
    const columns = room.seats.map((column) => column.seats.length);
    const [seleccionadas, setSeleccionadas] = useState(Array(rows).fill(Array(columns).fill(false)));
    
    const groupedRows = roomData.Seats.reduce((result, currentValue) => {
        (result[currentValue['row']] = result[currentValue['row']] || []).push(currentValue);
        return result;
    }, {});

    const handleCellClick = (row, seat) => {
        setSeleccionadas((prevSeleccionadas) => ({
            ...prevSeleccionadas,
            [row]: {
                ...prevSeleccionadas[row],
                [seat]: !prevSeleccionadas[row]?.[seat],
            },
        }));
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

        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulario enviado:', formData);
            sendReservationData(formData);
            handleAction()
        }
    };

    const handleAction = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigate('/movies');
        }, 3000);
    };

    const sendReservationData = (formData) => {
        const objectReservation = {
            "movieProgramming": room.room.movieProgramming,
            "room_seat_id": seleccionadas,
            "customer_name": formData.name,
            "customer_email": formData.email
        }
        // service saveBooking(objectReservation)

    }

    return (
        <main>
            <div className='container mt-5'>
                <h3 className='mt-5 mb-5'>Registar reserva</h3>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <div className="row mb-5">
                            <div className='col-12 screen'>
                                <h3>Pantalla</h3>
                            </div>
                        </div>
                        {
                            Object.keys(groupedRows).map((s) => {
                                return (<div className="row mb-3">
                                    {
                                        groupedRows[s].map((p) => {
                                            const isSelected = seleccionadas[s]?.[p.seat];
                                            return (
                                                <div
                                                    className={`col seat d-flex justify-content-center align-items-center m-1 ${isSelected ? 'bg-success' : 'bg-outline-secondary'
                                                        }`}
                                                    key={`${s}${p.seat}`}
                                                    onClick={() => handleCellClick(s, p.seat)}
                                                >
                                                    {`${s}${p.seat}`}
                                                </div>
                                            )
                                        })
                                    }
                                </div>)
                            })
                        }
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <h5>Pelicula</h5>
                        <span className='mt-2'>{movie.title}</span>
                        <h5 className='mt-3'>Sala</h5>
                        <span className='mt-2'>{room.room.name}</span>
                        <h5 className='mt-3'>Horario</h5>
                        <span className='mt-2'>{room.room.movieProgramming}</span>

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
                                <h5 className="modal-title">Reservación confirmada</h5>
                            </div>
                            <div className="modal-body">
                                <p>La reservación se creo exitosamente.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
};