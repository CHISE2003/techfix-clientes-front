# TechFix Solutions S.A.S. - Front-end módulo de clientes

Evidencia GA7-220501096-AA4-EV03 - SENA ADSO.
Aplicación web en React (Vite) que consume la API REST de clientes desarrollada en Spring Boot.

## Requisitos
- Node.js 18 o superior
- API REST de clientes en ejecución (por defecto http://localhost:8080/api/clientes)
- En desarrollo, Vite reenvía /api hacia http://localhost:8080 (proxy en vite.config.js)

## Ejecución
```bash
npm install
copy .env.example .env    # (Linux/Mac: cp .env.example .env)
npm run dev               # http://localhost:5173
npm run build             # genera la versión de producción en /dist
```

## Estructura
- `src/App.jsx` - componente raíz y lógica CRUD
- `src/components/` - Navbar, ClienteList, ClienteItem, ClienteForm, SearchBar, Pagination, ConfirmModal, Alert, Footer
- `src/services/clienteService.js` - llamadas HTTP (axios) a la API
- `src/styles/app.css` - estilos

## Estándares de codificación
- Componentes en PascalCase, un componente por archivo; variables y funciones en camelCase.
- Componentes funcionales con Hooks (useState, useEffect).
- Comentarios que explican el propósito de cada componente, props y funciones.
- Acceso a datos separado de la interfaz (capa de servicios).

## API consumida
GET /api/clientes, POST /api/clientes, PUT /api/clientes/{id}, DELETE /api/clientes/{id}.
Campos del cliente: idCliente, tipoDocumento, numeroDocumento, nombres, apellidos, telefono, correo, direccion.
