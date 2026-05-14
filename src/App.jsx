// Importa useState para manejar datos del formulario
import { useState } from "react";

// Función principal
function App() {

  // Estado para guardar correo
  const [correo, setCorreo] = useState("");

  // Estado para guardar contraseña
  const [contrasena, setContrasena] = useState("");

  // Función que se ejecuta al enviar formulario
// Función para iniciar sesión
const iniciarSesion = async (e) => {

  // Evita recargar la página
  e.preventDefault();

  try {

    // Enviar datos al backend Java
    const respuesta = await fetch(
      "http://localhost:8081/OpenAlmacenBackend/login",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        // Datos enviados al servlet
        body:
          `correo=${correo}&contrasena=${contrasena}`

      }
    );

    // Convertir respuesta JSON
    const datos = await respuesta.json();

    // Mostrar mensaje
    alert(datos.mensaje);

  } catch (error) {

    console.log("Error:", error);

  }

};

  // Interfaz visual
  return (

    <div>

      {/* Título */}
      <h1>Open Almacen</h1>

      {/* Subtítulo */}
      <h2>Iniciar Sesión</h2>

      {/* Formulario login */}
      <form onSubmit={iniciarSesion}>

        {/* Campo correo */}
        <input
          type="email"
          placeholder="Ingrese correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <br /><br />

        {/* Campo contraseña */}
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <br /><br />

        {/* Botón login */}
        <button type="submit">
          Ingresar
        </button>

      </form>

    </div>

  );

}

// Exportar componente
export default App;