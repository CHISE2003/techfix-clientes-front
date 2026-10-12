// Componente condicional: ventana de confirmación antes de eliminar un registro.
// Props: visible, mensaje, onConfirmar y onCancelar.
function ConfirmModal({ visible, mensaje, onConfirmar, onCancelar }) {
  if (!visible) return null;
  return (
    <div className="modal-fondo">
      <div className="modal">
        <p>{mensaje}</p>
        <div className="modal-acciones">
          <button className="btn btn-peligro" onClick={onConfirmar}>
            Eliminar
          </button>
          <button className="btn" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
