// Importar useState
import { useState } from "react";

// Función principal
function App() {

  // Estados formulario equipos
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [marca, setMarca] = useState("");
  const [serialEquipo, setSerialEquipo] = useState("");
  const [estadoEquipo, setEstadoEquipo] = useState("");

  // Función guardar equipo
  const guardarEquipo = async (e) => {

    // Evitar recarga
    e.preventDefault();

    try {

      // Enviar datos al backend Java
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/guardarEquipo",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          // Datos enviados
          body:
            `nombreEquipo=${nombreEquipo}
            &marca=${marca}
            &serialEquipo=${serialEquipo}
            &estadoEquipo=${estadoEquipo}`

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
      <h2>Gestión de Equipos</h2>

      {/* Formulario */}
      <form onSubmit={guardarEquipo}>

        {/* Nombre equipo */}
        <input
          type="text"
          placeholder="Nombre equipo"
          value={nombreEquipo}
          onChange={(e) => setNombreEquipo(e.target.value)}
        />

        <br /><br />

        {/* Marca */}
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <br /><br />

        {/* Serial */}
        <input
          type="text"
          placeholder="Serial equipo"
          value={serialEquipo}
          onChange={(e) => setSerialEquipo(e.target.value)}
        />

        <br /><br />

        {/* Estado */}
        <input
          type="text"
          placeholder="Estado equipo"
          value={estadoEquipo}
          onChange={(e) => setEstadoEquipo(e.target.value)}
        />

        <br /><br />

        {/* Botón guardar */}
        <button type="submit">
          Guardar Equipo
        </button>

      </form>

    </div>

  );

}

// Exportar componente
export default App;