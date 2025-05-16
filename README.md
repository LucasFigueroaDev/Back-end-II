# 🛒 E-commerce Backend con Node.js & Express

Este es un proyecto backend para una aplicación de e-commerce, desarrollado con **Node.js**, **Express**, y una arquitectura basada en DAO, repositorios y middlewares personalizados.

## 📁 Estructura del proyecto

```
src/
│
├── config/                # Configuraciones generales
├── controllers/           # Controladores para manejar la lógica de negocio
├── dao/                   # Acceso a datos (Data Access Objects)
├── dto/                   # Data Transfer Objects (estructura de datos entre capas)
├── middlewares/           # Middlewares personalizados (auth, manejo de errores, etc.)
│   └── validator/
├── models/                # Modelos de Mongoose
├── public/                # Archivos estáticos (CSS, JS, imágenes)
├── repositories/          # Encapsulan la lógica de acceso a datos
├── routes/                # Definición de rutas Express para distintos recursos
├── utils/                 # Funciones utilitarias (JWT, manejo de errores, helpers)
├── views/                 # Vistas de servidor con Handlebars
│   └── layouts/
│       └── resetPassword.handlebars
```

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LucasFigueroaDev/Back-end-II.git
   cd nombre-del-proyecto
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` con tus variables de entorno:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/mi_basedatos
   JWT_SECRET=mi_clave_supersecreta
   EMAIL_USER=micorreo@dominio.com
   EMAIL_PASS=miclaveemail
   ```

4. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## 🧠 Arquitectura del proyecto

- **DAO (Data Access Object):** Encargados de abstraer el acceso a la base de datos.
- **Repositories:** Intermediarios entre los DAO y la lógica de negocio, útil para desacoplar componentes.
- **Middlewares:** Validaciones, control de acceso, manejo de errores.
- **Controllers:** Procesan las solicitudes entrantes y llaman a los servicios/repositories correspondientes.
- **Utils:** Utilidades para manejar errores, tokens, respuestas estandarizadas, entre otros.
- **Vistas:** Sistema de plantillas Handlebars para vistas simples como recuperación de contraseña.

## 🛠 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Handlebars
- JWT (JSON Web Tokens)
- Nodemailer
- dotenv
- bcrypt

## 📦 Scripts

```bash
npm run dev   
```

## 🔐 Funcionalidades destacadas

- Autenticación con JWT
- Gestión de usuarios, productos, carritos y tickets
- Middleware para validación de administrador
- Recuperación de contraseña por correo electrónico
- Vistas con Handlebars para interacción mínima del usuario
- Sistema modular y escalable

## 📬 Contacto

Para dudas o sugerencias puedes contactarme en [figueroa.dev93@gmail.com]

---

¡Gracias por visitar este proyecto! ⭐
