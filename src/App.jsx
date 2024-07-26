import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugadorId, setNuevoJugadorId] = useState('');
  const [nuevoJugadorNombre, setNuevoJugadorNombre] = useState('');
  const [nuevoJugadorTitular, setNuevoJugadorTitular] = useState(false);
  const [nuevoJugadorPosicion, setNuevoJugadorPosicion] = useState('');
  const [editandoJugador, setEditandoJugador] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleNuevoJugadorId = (e) => setNuevoJugadorId(e.target.value);
  const handleNuevoJugadorNombre = (e) => setNuevoJugadorNombre(e.target.value);
  const handleNuevoJugadorTitular = (e) => setNuevoJugadorTitular(e.target.checked);
  const handleNuevoJugadorPosicion = (e) => setNuevoJugadorPosicion(e.target.value);

  const handleAgregarJugador = () => {
    if (!nuevoJugadorId || !nuevoJugadorNombre || !nuevoJugadorPosicion) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    const nuevoJugador = {
      id: nuevoJugadorId,
      nombre: nuevoJugadorNombre,
      titular: nuevoJugadorTitular,
      posicion: nuevoJugadorPosicion
    };
    setJugadores(prev => {
      const nuevoArreglo = [...prev, nuevoJugador];
      localStorage.setItem("jugadores", JSON.stringify(nuevoArreglo));
      setMensaje('Jugador agregado exitosamente');
      return nuevoArreglo;
    });
    setNuevoJugadorId('');
    setNuevoJugadorNombre('');
    setNuevoJugadorTitular(false);
    setNuevoJugadorPosicion('');
  };

  const handleEliminarJugador = (idJugador) => {
    setJugadores(prev => {
      const resultadosEliminados = prev.filter(objeto => objeto.id !== idJugador);
      localStorage.setItem("jugadores", JSON.stringify(resultadosEliminados));
      setMensaje('Jugador eliminado exitosamente');
      return resultadosEliminados;
    });
  };

  const handleEditarJugador = (jugador) => {
    setEditandoJugador(jugador);
    setNuevoJugadorId(jugador.id);
    setNuevoJugadorNombre(jugador.nombre);
    setNuevoJugadorTitular(jugador.titular);
    setNuevoJugadorPosicion(jugador.posicion);
  };

  const handleGuardarEdicion = () => {
    setJugadores(prev => {
      const jugadoresActualizados = prev.map(j => 
        j.id === editandoJugador.id ? { ...j, id: nuevoJugadorId, nombre: nuevoJugadorNombre, titular: nuevoJugadorTitular, posicion: nuevoJugadorPosicion } : j
      );
      localStorage.setItem("jugadores", JSON.stringify(jugadoresActualizados));
      setMensaje('Jugador editado exitosamente');
      return jugadoresActualizados;
    });
    setEditandoJugador(null);
    setNuevoJugadorId('');
    setNuevoJugadorNombre('');
    setNuevoJugadorTitular(false);
    setNuevoJugadorPosicion('');
  };

  const handleCancelarEdicion = () => {
    setEditandoJugador(null);
    setNuevoJugadorId('');
    setNuevoJugadorNombre('');
    setNuevoJugadorTitular(false);
    setNuevoJugadorPosicion('');
  };

  useEffect(() => {
    const jugadoresAlmacenados = JSON.parse(localStorage.getItem("jugadores") || "[]");
    setJugadores(jugadoresAlmacenados);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-4">
          <div className="card p-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="id_jugador">ID Jugador</label>
                <input
                  type="number"
                  className="form-control"
                  value={nuevoJugadorId}
                  onChange={handleNuevoJugadorId}
                  name="id_jugador"
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre_jugador">Nombre del Jugador</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoJugadorNombre}
                  onChange={handleNuevoJugadorNombre}
                  name="nombre_jugador"
                  placeholder="Ingrese el nombre del jugador"
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={nuevoJugadorTitular}
                  onChange={handleNuevoJugadorTitular}
                  name="titular_jugador"
                />
                <label className="form-check-label" htmlFor="titular_jugador">Titular</label>
              </div>
              <div className="form-group">
                <label htmlFor="posicion_jugador">Posición del Jugador</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoJugadorPosicion}
                  onChange={handleNuevoJugadorPosicion}
                  name="posicion_jugador"
                  placeholder="Ingrese la posición del jugador"
                />
              </div>
              {editandoJugador ? (
                <>
                  <button 
                    type="button" 
                    className="btn" 
                    style={{ backgroundColor: 'gold', color: 'black' }} 
                    onClick={handleGuardarEdicion}
                  >
                    Guardar Cambios
                  </button>
                  <button 
                    type="button" 
                    className="btn ml-2" 
                    style={{ backgroundColor: 'gold', color: 'black' }} 
                    onClick={handleCancelarEdicion}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button 
                  type="button" 
                  className="btn" 
                  style={{ backgroundColor: 'gold', color: 'black' }} 
                  onClick={handleAgregarJugador}
                >
                  Añadir Jugador
                </button>
              )}
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
          </div>
          <div className="mt-4">
            <h3>Lista de Jugadores</h3>
            <ul className="list-group">
              {jugadores.map((jug) => (
                <li key={jug.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    ID: {jug.id}, NOMBRE: {jug.nombre}, TITULAR: {jug.titular ? 'Sí' : 'No'}, POSICIÓN: {jug.posicion}
                  </span>
                  <span>
                    <button 
                      type="button" 
                      className="btn btn-sm mr-2" 
                      style={{ backgroundColor: 'gold', color: 'black' }} 
                      onClick={() => handleEditarJugador(jug)}
                    >
                      Editar
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm" 
                      style={{ backgroundColor: 'gold', color: 'black' }} 
                      onClick={() => handleEliminarJugador(jug.id)}
                    >
                      Eliminar
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
