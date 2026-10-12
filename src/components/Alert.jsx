// Componente de presentación: muestra mensajes de éxito o error.
// Props: mensaje (string) y tipo ('exito' | 'error'). Si no hay mensaje, no renderiza nada.
function Alert({ mensaje, tipo }) {
  if (!mensaje) return null;
  return <div className={`alert alert-${tipo}`}>{mensaje}</div>;
}

export default Alert;
