// Componente de presentación: controles de paginación.
// Props: pagina (actual), totalPaginas y onCambiarPagina (callback).
function Pagination({ pagina, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;
  return (
    <div className="pagination">
      <button disabled={pagina === 1} onClick={() => onCambiarPagina(pagina - 1)}>
        Anterior
      </button>
      <span>
        Página {pagina} de {totalPaginas}
      </span>
      <button disabled={pagina === totalPaginas} onClick={() => onCambiarPagina(pagina + 1)}>
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
