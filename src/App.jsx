// Componente raíz: coordina el estado general y las operaciones CRUD de clientes.
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Alert from './components/Alert.jsx';
import ClienteList from './components/ClienteList.jsx';
import ClienteForm from './components/ClienteForm.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from './services/clienteService.js';

function App() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'exito' });

  // Muestra un mensaje temporal al usuario
  const mostrarAlerta = (mensaje, tipo = 'exito') => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta({ mensaje: '', tipo }), 5000);
  };

  // Consulta los clientes a la API REST
  const cargarClientes = async () => {
    try {
      setClientes(await obtenerClientes());
    } catch {
      mostrarAlerta('No se pudo conectar con la API de clientes.', 'error');
    }
  };

  // Se ejecuta una sola vez al montar el componente
  useEffect(() => {
    cargarClientes();
  }, []);

  // Crea o actualiza según exista un cliente en edición
  const guardarCliente = async (datos) => {
    try {
      if (clienteEditando) {
        await actualizarCliente(clienteEditando.idCliente, datos);
        mostrarAlerta('Cliente actualizado correctamente.');
      } else {
        await crearCliente(datos);
        mostrarAlerta('Cliente registrado correctamente.');
      }
      setClienteEditando(null);
      cargarClientes();
    } catch {
      mostrarAlerta('Ocurrió un error al guardar el cliente.', 'error');
    }
  };

  // Elimina el cliente confirmado en el modal
  const confirmarEliminacion = async () => {
    try {
      await eliminarCliente(clienteAEliminar.idCliente);
      mostrarAlerta('Cliente eliminado correctamente.');
      cargarClientes();
    } catch {
      mostrarAlerta('Ocurrió un error al eliminar el cliente.', 'error');
    }
    setClienteAEliminar(null);
  };

  return (
    <>
      <Navbar />
      <main className="contenedor">
        <Alert mensaje={alerta.mensaje} tipo={alerta.tipo} />
        <ClienteForm
          clienteEditando={clienteEditando}
          onGuardar={guardarCliente}
          onCancelar={() => setClienteEditando(null)}
        />
        <ClienteList
          clientes={clientes}
          onEditar={setClienteEditando}
          onEliminar={setClienteAEliminar}
        />
      </main>
      <ConfirmModal
        visible={clienteAEliminar !== null}
        mensaje={`¿Desea eliminar a ${clienteAEliminar?.nombres ?? ''} ${clienteAEliminar?.apellidos ?? ''}?`}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setClienteAEliminar(null)}
      />
      <Footer />
    </>
  );
}

export default App;
