// Componente con estado: lista de clientes con búsqueda y paginación.
// Props: clientes (arreglo), onEditar y onEliminar.
import { useState } from 'react';
import ClienteItem from './ClienteItem.jsx';
import SearchBar from './SearchBar.jsx';
import Pagination from './Pagination.jsx';

const CLIENTES_POR_PAGINA = 5;

function ClienteList({ clientes, onEditar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

  // Filtra por nombres, apellidos o número de documento (ignora mayúsculas/minúsculas)
  const texto = busqueda.toLowerCase();
  const filtrados = clientes.filter(
    (c) =>
      (c.nombres || '').toLowerCase().includes(texto) ||
      (c.apellidos || '').toLowerCase().includes(texto) ||
      String(c.numeroDocumento || '').includes(busqueda)
  );

  // Calcula la porción de registros que corresponde a la página actual
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / CLIENTES_POR_PAGINA));
  const inicio = (pagina - 1) * CLIENTES_POR_PAGINA;
  const visibles = filtrados.slice(inicio, inicio + CLIENTES_POR_PAGINA);

  // Al buscar se vuelve a la primera página
  const manejarBusqueda = (valor) => {
    setBusqueda(valor);
    setPagina(1);
  };

  return (
    <section>
      <h2>Listado de clientes</h2>
      <SearchBar valor={busqueda} onCambio={manejarBusqueda} />
      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.length === 0 ? (
              <tr>
                <td colSpan="7">No hay clientes para mostrar.</td>
              </tr>
            ) : (
              visibles.map((c) => (
                <ClienteItem
                  key={c.idCliente}
                  cliente={c}
                  onEditar={onEditar}
                  onEliminar={onEliminar}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiarPagina={setPagina} />
    </section>
  );
}

export default ClienteList;
