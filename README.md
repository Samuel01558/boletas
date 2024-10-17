

# Eventos App

Este proyecto es una aplicación web para gestionar y visualizar eventos de conciertos. Los administradores pueden agregar, editar y eliminar eventos, mientras que los usuarios pueden ver los eventos disponibles. La aplicación está construida con **React** para el front-end y **Node.js** para el back-end.

## Tabla de Contenidos
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Características](#características)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Instalación

### Prerrequisitos
Asegúrate de tener instalado lo siguiente:
- **Node.js** (v14 o superior)
- **npm** (normalmente viene con Node.js)
- **MongoDB** (para la base de datos)

### Pasos de instalación
1. Clona el repositorio desde GitHub:
   ```bash
   git clone https://github.com/tu-usuario/eventos-app.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd eventos-app
   ```

3. Instala las dependencias del servidor y del cliente:

   - Instalar dependencias del **back-end** (servidor):
     ```bash
     cd backend
     npm install
     ```

   - Instalar dependencias del **front-end** (cliente):
     ```bash
     cd ../frontend
     npm install
     ```

### Configuración de Variables de Entorno

Crea un archivo `.env` en la carpeta `backend` y agrega las siguientes variables de entorno:

```bash
PORT=5001
MONGODB_URI=mongodb://localhost:27017/eventosdb
JWT_SECRET=tu-secreto
```

Estas variables controlan el puerto en el que se ejecutará el servidor, la conexión a la base de datos MongoDB y el secreto para autenticación JWT (si se usa).

### Ejecución del proyecto

1. Inicia el servidor **back-end**:
   ```bash
   cd backend
   npm start
   ```

2. Inicia la aplicación **front-end**:
   ```bash
   cd ../frontend
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000` y el servidor en `http://localhost:5001`.

---

## Uso

### Modo Administrador
1. **Iniciar sesión** como administrador para acceder al **Panel de Administración** donde puedes agregar, editar o eliminar eventos.
   
2. Desde el panel, puedes gestionar los eventos añadiendo información como el título, descripción, fecha y precio del evento.

### Modo Usuario
1. Los **usuarios normales** pueden ver los eventos disponibles con detalles como el título, fecha, y precio, pero no pueden editarlos ni eliminarlos.

---

## Estructura del Proyecto

```
eventos-app/
│
├── backend/                # Carpeta del servidor
│   ├── models/             # Modelos de datos (Usuario, Evento)
│   ├── routes/             # Definición de las rutas (login, eventos)
│   ├── server.js           # Punto de entrada del servidor
│   ├── controllers/        # Lógica de negocio para eventos y usuarios
│   └── package.json        # Dependencias del servidor
│
├── frontend/               # Carpeta del cliente
│   ├── src/
│   │   ├── components/     # Componentes de React (AdminBoletas, UserBoletas, etc.)
│   │   ├── pages/          # Páginas principales (Home, Login, Register)
│   │   ├── App.js          # Componente principal de la aplicación
│   │   ├── index.js        # Punto de entrada del cliente
│   └── package.json        # Dependencias del cliente
│
├── README.md               # Documentación del proyecto
└── .gitignore              # Archivos a ignorar en Git
```

---

## Características

### Administradores:
- Crear, editar y eliminar eventos.
- Ver una lista de eventos en formato amigable.
- Manejar los eventos con campos: título, descripción, fecha y precio.

### Usuarios:
- Ver todos los eventos disponibles en el sistema.
- Sin acceso a la modificación de eventos.

### Otras características:
- **Diseño responsivo**: Funciona bien en dispositivos móviles y de escritorio.
- **Sistema de login**: Admin y usuarios acceden mediante el mismo formulario de login (sin autenticación avanzada por ahora).

---

## Contribución

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

1. Haz un **fork** del proyecto.
2. Crea una nueva rama con tu funcionalidad (`git checkout -b mi-nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube la rama (`git push origin mi-nueva-funcionalidad`).
5. Crea un **pull request** en GitHub.

---

## Licencia

Este proyecto está licenciado bajo la **MIT License**. Puedes consultar el archivo `LICENSE` para más detalles.
