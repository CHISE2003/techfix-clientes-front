// Formulario controlado reutilizado para crear y editar clientes.
// Props: clienteEditando (null si es registro nuevo), onGuardar y onCancelar.
import { useState, useEffect } from 'react';

// Valores iniciales del formulario (coinciden con los campos de la entidad Cliente)
const VACIO = {
  tipoDocumento: 'CC',
  numeroDocumento: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  correo: '',
  direccion: '',
};

function ClienteForm({ clienteEditando, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(VACIO);
  const [error, setError] = useState('');

  // Cuando cambia el cliente a editar, se cargan sus datos en el formulario
  useEffect(() => {
    // Los campos nulos de la API se convierten en texto vacío para los inputs controlados
    const base = clienteEditando || VACIO;
    setDatos({
      ...VACIO,
      ...Object.fromEntries(Object.entries(base).map(([k, v]) => [k, v ?? ''])),
    });
    setError('');
  }, [clienteEditando]);

  // Actualiza el campo modificado (evento onChange)
  const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  // Valida y envía el formulario (evento onSubmit)
  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!datos.numeroDocumento.trim() || !datos.nombres.trim() || !datos.apellidos.trim()) {
      setError('El documento, los nombres y los apellidos son obligatorios.');
      return;
    }
    if (datos.correo && !/^\S+@\S+\.\S+$/.test(datos.correo)) {
      setError('El correo electrónico no tiene un formato válido.');
      return;
    }
    onGuardar(datos);
    setDatos(VACIO);
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <h2>{clienteEditando ? 'Editar cliente' : 'Registrar cliente'}</h2>
      <select name="tipoDocumento" value={datos.tipoDocumento} onChange={manejarCambio}>
        <option value="CC">Cédula de ciudadanía (CC)</option>
        <option value="TI">Tarjeta de identidad (TI)</option>
        <option value="CE">Cédula de extranjería (CE)</option>
        <option value="NIT">NIT</option>
      </select>
      <input name="numeroDocumento" placeholder="Número de documento" value={datos.numeroDocumento} onChange={manejarCambio} />
      <input name="nombres" placeholder="Nombres" value={datos.nombres} onChange={manejarCambio} />
      <input name="apellidos" placeholder="Apellidos" value={datos.apellidos} onChange={manejarCambio} />
      <input name="telefono" placeholder="Teléfono" value={datos.telefono} onChange={manejarCambio} />
      <input name="correo" placeholder="Correo electrónico" value={datos.correo} onChange={manejarCambio} />
      <input name="direccion" placeholder="Dirección" value={datos.direccion} onChange={manejarCambio} />
      {error && <p className="error">{error}</p>}
      <div>
        <button type="submit" className="btn btn-primario">
          {clienteEditando ? 'Actualizar' : 'Guardar'}
        </button>
        {clienteEditando && (
          <button type="button" className="btn" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ClienteForm;
