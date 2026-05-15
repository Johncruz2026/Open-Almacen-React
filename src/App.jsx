// Importar hooks de React
import { useEffect, useState } from "react";

// Función principal
function App() {

  // Estados del formulario
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [marca, setMarca] = useState("");
  const [serialEquipo, setSerialEquipo] = useState("");
  const [estadoEquipo, setEstadoEquipo] = useState("");

  // Estado lista equipos
  const [equipos, setEquipos] = useState([]);

  // Función guardar equipo
  const guardarEquipo = async (e) => {

    // Evitar recargar página
    e.preventDefault();

    try {

      // Petición al backend Java
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/guardarEquipo",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          // Datos enviados
          body:
            `nombreEquipo=${nombreEquipo}&marca=${marca}&serialEquipo=${serialEquipo}&estadoEquipo=${estadoEquipo}`

        }
      );

      // Convertir respuesta JSON
      const datos = await respuesta.json();

      // Mostrar mensaje
      alert(datos.mensaje);

      // Limpiar formulario
      setNombreEquipo("");
      setMarca("");
      setSerialEquipo("");
      setEstadoEquipo("");

      // Recargar tabla
      listarEquipos();

    } catch (error) {

      console.log("Error:", error);

    }

  };

  // Función listar equipos
  const listarEquipos = async () => {

    try {

      // Consumir servlet
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/listarEquipos"
      );

      // Convertir a JSON
      const datos = await respuesta.json();

      // Guardar datos en estado
      setEquipos(datos);

      // Ver datos en consola
      console.log(datos);

    } catch (error) {

      console.log("Error:", error);

    }

  };

  // Ejecutar al iniciar
  useEffect(() => {

    listarEquipos();

  }, []);

  // Interfaz
  return (

    <div>

      {/* Título */}
      <h1>Open Almacen</h1>

      {/* Subtítulo */}
      <h2>Gestión de Equipos</h2>

      {/* Formulario */}
      <form onSubmit={guardarEquipo}>

        {/* Nombre */}
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

        {/* Botón */}
        <button type="submit">
          Guardar Equipo
        </button>

      </form>

      <hr />

      {/* Tabla equipos */}
      <h2>Lista de Equipos</h2>

      <table border="1">

        <thead>

          <tr>

            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Serial</th>
            <th>Estado</th>

          </tr>

        </thead>

        <tbody>

          {equipos.map((equipo) => (

            <tr key={equipo.id}>

              <td>{equipo.id}</td>
              <td>{equipo.nombreEquipo}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.serialEquipo}</td>
              <td>{equipo.estadoEquipo}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

// Exportar componente
export default App;