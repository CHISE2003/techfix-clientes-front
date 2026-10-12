// Servicio que concentra las llamadas HTTP a la API REST de clientes.
// Se separa de los componentes para mantener la lógica de acceso a datos en un solo lugar.
import axios from 'axios';

// URL base configurable mediante variable de entorno (ver .env.example)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/clientes';

/** Obtiene la lista completa de clientes (GET /api/clientes) */
export const obtenerClientes = () => axios.get(API_URL).then((res) => res.data);

/** Registra un nuevo cliente (POST /api/clientes) */
export const crearCliente = (cliente) => axios.post(API_URL, cliente).then((res) => res.data);

/** Actualiza un cliente existente (PUT /api/clientes/{id}) */
export const actualizarCliente = (id, cliente) =>
  axios.put(`${API_URL}/${id}`, cliente).then((res) => res.data);

/** Elimina un cliente por su identificador (DELETE /api/clientes/{id}) */
export const eliminarCliente = (id) => axios.delete(`${API_URL}/${id}`);
