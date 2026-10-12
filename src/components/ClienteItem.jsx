// Componente de presentación: una fila de la tabla de clientes.
// Props: cliente, onEditar y onEliminar.
function ClienteItem({ cliente, onEditar, onEliminar }) {
  return (
    <tr>
      <td>{cliente.tipoDocumento}</td>
      <td>{cliente.numeroDocumento}</td>
      <td>
        {cliente.nombres} {cliente.apellidos}
      </td>
      <td>{cliente.telefono}</td>
      <td>{cliente.correo}</td>
      <td>{cliente.direccion}</td>
      <td>
        <button className="btn" onClick={() => onEditar(cliente)}>
          Editar
        </button>
        <button className="btn btn-peligro" onClick={() => onEliminar(cliente)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default ClienteItem;
