import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [jugadores, setJugadores] = useState(obtenerJugadores());
  const [nuevoJugador, setNuevoJugador] = useState({ id: '', nombre: '', titular: false, posicion: '' });
  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoJugador({ ...nuevoJugador, [name]: value });
  };

  const handleAddJugador = () => {
    if (esClaveUnica(nuevoJugador.id)) {
      agregarJugador(nuevoJugador);
      setJugadores(obtenerJugadores());
      setMensaje('Jugador agregado exitosamente');
    } else {
      setMensaje('Error: El ID del jugador ya existe');
    }
  };

  const handleDeleteJugador = (id) => {
    eliminarJugador(id);
    setJugadores(obtenerJugadores());
    setMensaje('Jugador eliminado exitosamente');
  };

  const handleEditJugador = (jugadorActualizado) => {
    actualizarJugador(jugadorActualizado);
    setJugadores(obtenerJugadores());
    setMensaje('Jugador actualizado exitosamente');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Jugadores del Real Madrid</h1>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
            <div className="form-group">
              <label>ID del Jugador (int)</label>
              <input
                type="number"
                name="id"
                value={nuevoJugador.id}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nombre del Jugador (str)</label>
              <input
                type="text"
                name="nombre"
                value={nuevoJugador.nombre}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                name="titular"
                checked={nuevoJugador.titular}
                onChange={(e) => setNuevoJugador({ ...nuevoJugador, titular: e.target.checked })}
                className="form-check-input"
              />
              <label className="form-check-label">Titular (bool)</label>
            </div>
            <div className="form-group">
              <label>Posición del Jugador (str)</label>
              <input
                type="text"
                name="posicion"
                value={nuevoJugador.posicion}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="button" onClick={handleAddJugador} className="btn btn-primary btn-block">Agregar Jugador</button>
          </form>
          <ul className="list-group mt-4">
            {jugadores.map(jugador => (
              <li key={jugador.id} className="list-group-item d-flex justify-content-between align-items-center">
                {JSON.stringify(jugador)}
                <div>
                  <button onClick={() => handleEditJugador(jugador)} className="btn btn-warning btn-sm mr-2">Editar</button>
                  <button onClick={() => handleDeleteJugador(jugador.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Funciones de manejo de localStorage
const obtenerJugadores = () => JSON.parse(localStorage.getItem('jugadores')) || [];
const setJugadores = (jugadores) => localStorage.setItem('jugadores', JSON.stringify(jugadores));

const agregarJugador = (jugador) => {
  const jugadores = obtenerJugadores();
  jugadores.push(jugador);
  setJugadores(jugadores);
};

const actualizarJugador = (jugadorActualizado) => {
  const jugadores = obtenerJugadores();
  const index = jugadores.findIndex(jugador => jugador.id === jugadorActualizado.id);
  if (index !== -1) {
    jugadores[index] = jugadorActualizado;
    setJugadores(jugadores);
  }
};

const eliminarJugador = (id) => {
  let jugadores = obtenerJugadores();
  jugadores = jugadores.filter(jugador => jugador.id !== id);
  setJugadores(jugadores);
};

const esClaveUnica = (id) => !obtenerJugadores().some(jugador => jugador.id === id);

export default App;
