import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MovieForm = () => {

  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [duracion, setDuracion] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const navigate = useNavigate();

  const [errores, setErrores] = useState({
    titulo: '',
    genero: '',
    duracion: '',
    clasificacion: ''
  });

  const validarFormulario = (e) => {
    e.preventDefault();

    let erroresTemp = { titulo: '', genero: '', duracion: '', clasificacion: '' };

    if (!titulo) {
      erroresTemp.titulo = 'Por favor, ingresa el título de la película.';
    }
    if (!genero) {
      erroresTemp.genero = 'Por favor, selecciona un género.';
    }
    if (!duracion || isNaN(duracion) || duracion <= 0) {
      erroresTemp.duracion = 'Por favor, ingresa una duración válida (número positivo).';
    }
    if (!clasificacion) {
      erroresTemp.clasificacion = 'Por favor, selecciona una clasificación.';
    }

    setErrores(erroresTemp);

    if (Object.values(erroresTemp).every((error) => error === '')) {
      // enviarlo al API
      alert('Película registrada exitosamente');
      setTitulo('');
      setGenero('');
      setDuracion('');
      setClasificacion('');
      navigate('/movies');
    }
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={validarFormulario} className="mt-4">
          <h3 className='mt-5 mb-5'>Registrar nueva pelicula</h3>

          <div className="form-group">
            <label htmlFor="titulo">Título de la película:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {errores.titulo && <small className="text-danger">{errores.titulo}</small>}
          </div>

          <div className="form-group mt-4">
            <label htmlFor="genero">Género:</label>
            <select
              id="genero"
              name="genero"
              className="form-control"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Selecciona un género</option>
              <option value="Acción">Acción</option>
              <option value="Comedia">Comedia</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia ficción">Ciencia ficción</option>
              <option value="Terror">Terror</option>
            </select>
            {errores.genero && <small className="text-danger">{errores.genero}</small>}
          </div>

          <div className="form-group mt-4">
            <label htmlFor="duracion">Duración (en minutos):</label>
            <input
              type="number"
              id="duracion"
              name="duracion"
              className="form-control"
              min="1"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
            {errores.duracion && <small className="text-danger">{errores.duracion}</small>}
          </div>

          <div className="form-group mt-4">
            <label htmlFor="clasificacion">Clasificación:</label>
            <select
              id="clasificacion"
              name="clasificacion"
              className="form-control"
              value={clasificacion}
              onChange={(e) => setClasificacion(e.target.value)}
            >
              <option value="">Selecciona una clasificación</option>
              <option value="G">G - General</option>
              <option value="PG">PG - Apta para menores con supervisión</option>
              <option value="PG-13">PG-13 - Apta para mayores de 13 años</option>
              <option value="R">R - Solo para mayores de 18 años</option>
              <option value="NC-17">NC-17 - No apta para menores de 17 años</option>
            </select>
            {errores.clasificacion && <small className="text-danger">{errores.clasificacion}</small>}
          </div>

          <div className="text-center mt-5">
            <button type="submit" className="btn btn-primary">
              Registrar Película
            </button>
          </div>
        </form>
      </div>
    </>
  );
};