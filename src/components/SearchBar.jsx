// Componente controlado: campo de búsqueda por nombre o documento.
// Props: valor (texto actual) y onCambio (función que avisa al componente padre).
function SearchBar({ valor, onCambio }) {
  return (
    <input
      type="text"
      className="search"
      placeholder="Buscar por nombre, apellido o documento..."
      value={valor}
      onChange={(e) => onCambio(e.target.value)} // evento onChange
    />
  );
}

export default SearchBar;
