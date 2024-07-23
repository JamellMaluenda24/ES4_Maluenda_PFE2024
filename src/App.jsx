import { useState, useEffect } from 'react';

function App() {
  // Estados para manejar la lista de jugadores y los campos del formulario
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugadorId, setNuevoJugadorId] = useState('');
  const [nuevoJugadorNombre, setNuevoJugadorNombre] = useState('');
  const [nuevoJugadorTitular, setNuevoJugadorTitular] = useState(false);
  const [nuevoJugadorPosicion, setNuevoJugadorPosicion] = useState('');
  const [editandoJugador, setEditandoJugador] = useState(null);

  // Manejador para actualizar el estado del ID cuando se escribe en el input
  const handleNuevoJugadorId = (e) => {
    setNuevoJugadorId(e.target.value);
  };

  // Manejador para actualizar el estado del nombre cuando se escribe en el input
  const handleNuevoJugadorNombre = (e) => {
    setNuevoJugadorNombre(e.target.value);
  };

  // Manejador para actualizar el estado del titular cuando se marca el checkbox
  const handleNuevoJugadorTitular = (e) => {
    setNuevoJugadorTitular(e.target.checked);
  };

  // Manejador para actualizar el estado de la posición cuando se escribe en el input
  const handleNuevoJugadorPosicion = (e) => {
    setNuevoJugadorPosicion(e.target.value);
  };

  // Función para agregar un nuevo jugador
  const handleAgregarJugador = () => {
    // Crear objeto con los datos del nuevo jugador
    const nuevoJugador = {
      id: nuevoJugadorId,
      nombre: nuevoJugadorNombre,
      titular: nuevoJugadorTitular,
      posicion: nuevoJugadorPosicion
    };
    console.log('Datos del jugador nuevo:', nuevoJugador);

    // Actualizar el estado de jugadores y guardar en localStorage
    setJugadores(prev => {
      const nuevoArreglo = [...prev, nuevoJugador];
      localStorage.setItem("jugadores", JSON.stringify(nuevoArreglo));
      return nuevoArreglo;
    });

    // Limpiar los campos del formulario después de agregar
    setNuevoJugadorId('');
    setNuevoJugadorNombre('');
    setNuevoJugadorTitular(false);
    setNuevoJugadorPosicion('');
  };

  // Función para eliminar un jugador
  const handleEliminarJugador = (idJugador) => {
    setJugadores(prev => {
      const resultadosEliminados = prev.filter(objeto => objeto.id !== idJugador);
      localStorage.setItem("jugadores", JSON.stringify(resultadosEliminados));
      return resultadosEliminados;
    });
  };

  // Función para iniciar la edición de un jugador
  const handleEditarJugador = (jugador) => {
    setEditandoJugador(jugador);
    setNuevoJugadorId(jugador.id);
    setNuevoJugadorNombre(jugador.nombre);
    setNuevoJugadorTitular(jugador.titular);
    setNuevoJugadorPosicion(jugador.posicion);
  };

  // Función para guardar los cambios de la edición
  const handleGuardarEdicion = () => {
    setJugadores(prev => {
      const jugadoresActualizados = prev.map(j => 
        j.id === editandoJugador.id ? { ...j, id: nuevoJugadorId, nombre: nuevoJugadorNombre, titular: nuevoJugadorTitular, posicion: nuevoJugadorPosicion } : j
      );
      localStorage.setItem("jugadores", JSON.stringify(jugadoresActualizados));
      return jugadoresActualizados;
    });

    // Resetear el estado de edición y limpiar los campos
    setEditandoJugador(null);
    setNuevoJugadorId('');
    setNuevoJugadorNombre('');
    setNuevoJugadorTitular(false);
    setNuevoJugadorPosicion('');
  };

  // Función para cancelar la edición
  const handleCancelarEdicion = () => {
    setEditandoJugador(null);
    setNuevoJugadorId('');
    setNuevoJugadorNombre('');
    setNuevoJugadorTitular(false);
    setNuevoJugadorPosicion('');
  };

  // Efecto que se ejecuta al montar el componente para cargar jugadores desde localStorage
  useEffect(() => {
    const jugadoresAlmacenados = JSON.parse(localStorage.getItem("jugadores") || "[]");
    setJugadores(jugadoresAlmacenados);
    console.log("Jugadores cargados desde localStorage:", jugadoresAlmacenados);
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      {/* Formulario para agregar/editar jugadores */}
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="id_jugador">ID Jugador</label><br />
          <input
            type="number"
            value={nuevoJugadorId}
            onChange={handleNuevoJugadorId}
            name="id_jugador"
          /><br /><br />
          <label htmlFor="nombre_jugador">Nombre del Jugador</label><br />
          <input
            type="text"
            value={nuevoJugadorNombre}
            onChange={handleNuevoJugadorNombre}
            name="nombre_jugador"
            placeholder="Ingrese el nombre del jugador"
          /><br /><br />
          <label htmlFor="titular_jugador">Titular</label><br />
          <input
            type="checkbox"
            checked={nuevoJugadorTitular}
            onChange={handleNuevoJugadorTitular}
            name="titular_jugador"
          /><br /><br />
          <label htmlFor="posicion_jugador">Posición del Jugador</label><br />
          <input
            type="text"
            value={nuevoJugadorPosicion}
            onChange={handleNuevoJugadorPosicion}
            name="posicion_jugador"
            placeholder="Ingrese la posición del jugador"
          /><br /><br />
          {editandoJugador ? (
            <>
              <button type="button" style={{ marginRight: '10px' }} onClick={handleGuardarEdicion}>Guardar Cambios</button>
              <button type="button" onClick={handleCancelarEdicion}>Cancelar</button>
            </>
          ) : (
            <button type="button" onClick={handleAgregarJugador}>Añadir Jugador</button>
          )}
        </form>
        <hr />
      </div>
      {/* Lista de jugadores */}
      <div>
        <h3>Lista de Jugadores</h3>
        <ul>
          {jugadores.map((jug) => (
            <li key={jug.id}>
              ID: {jug.id}, NOMBRE: {jug.nombre}, TITULAR: {jug.titular ? 'Sí' : 'No'}, POSICIÓN: {jug.posicion}
              <button type="button" onClick={() => handleEditarJugador(jug)} style={{ marginLeft: '10px', marginRight: '10px' }}>Editar</button>
              <button type="button" onClick={() => handleEliminarJugador(jug.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
