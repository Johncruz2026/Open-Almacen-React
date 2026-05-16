// Importar hooks React
import { useEffect, useState } from "react";

// Función principal
function App() {

  // =========================
  // ESTADOS DEL FORMULARIO
  // =========================

  // Estado nombre equipo
  const [nombreEquipo, setNombreEquipo] = useState("");

  // Estado marca
  const [marca, setMarca] = useState("");

  // Estado serial
  const [serialEquipo, setSerialEquipo] = useState("");

  // Estado equipo
  const [estadoEquipo, setEstadoEquipo] = useState("");

  // Estado lista equipos
  const [equipos, setEquipos] = useState([]);

  // =========================
  // FUNCIÓN GUARDAR EQUIPO
  // =========================

  const guardarEquipo = async (e) => {

    // Evitar recargar página
    e.preventDefault();

    try {

      // Petición al backend Java
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/guardarEquipo",
        {

          // Método HTTP
          method: "POST",

          // Tipo datos enviados
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          // Datos enviados al servlet
          body:
            `nombreEquipo=${nombreEquipo}&marca=${marca}&serialEquipo=${serialEquipo}&estadoEquipo=${estadoEquipo}`

        }
      );

      // Obtener respuesta como texto
      const texto = await respuesta.text();

      // Mostrar respuesta consola
      console.log(texto);

      // Convertir texto JSON
      const datos = JSON.parse(texto);

      // Mostrar mensaje
      alert(datos.mensaje);

      // Limpiar formulario
      setNombreEquipo("");
      setMarca("");
      setSerialEquipo("");
      setEstadoEquipo("");

      // Actualizar tabla
      listarEquipos();

    } catch (error) {

      // Mostrar error consola
      console.log("Error:", error);

      // Mostrar error usuario
      alert("Error de conexión con backend");

    }

  };

  // =========================
  // FUNCIÓN LISTAR EQUIPOS
  // =========================

  const listarEquipos = async () => {

    try {

      // Consumir servlet listar
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/listarEquipos"
      );

      // Obtener respuesta
      const texto = await respuesta.text();

      // Convertir JSON
      const datos = JSON.parse(texto);

      // Guardar datos en estado
      setEquipos(datos);

    } catch (error) {

      // Mostrar error consola
      console.log("Error:", error);

    }

  };

  // =========================
  // FUNCIÓN ELIMINAR EQUIPO
  // =========================

  const eliminarEquipo = async (id) => {

    try {

      // Petición backend eliminar
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/eliminarEquipo",
        {

          // Método HTTP
          method: "POST",

          // Tipo contenido
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          // Enviar id
          body: `id=${id}`

        }
      );

      // Obtener respuesta
      const texto = await respuesta.text();

      // Convertir JSON
      const datos = JSON.parse(texto);

      // Mostrar mensaje
      alert(datos.mensaje);

      // Actualizar tabla
      listarEquipos();

    } catch (error) {

      // Mostrar error
      console.log("Error:", error);

    }

  };

  // =========================
  // EJECUTAR AL INICIAR
  // =========================

  useEffect(() => {

    // Cargar equipos automáticamente
    listarEquipos();

  }, []);

  // =========================
  // INTERFAZ VISUAL
  // =========================

  return (

    <div>

      {/* Título principal */}
      <h1>Open Almacen</h1>

      {/* Subtítulo */}
      <h2>Gestión de Equipos</h2>

      {/* Formulario equipos */}
      <form onSubmit={guardarEquipo}>

        {/* Campo nombre */}
        <input
          type="text"
          placeholder="Nombre equipo"
          value={nombreEquipo}
          onChange={(e) => setNombreEquipo(e.target.value)}
        />

        <br /><br />

        {/* Campo marca */}
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <br /><br />

        {/* Campo serial */}
        <input
          type="text"
          placeholder="Serial equipo"
          value={serialEquipo}
          onChange={(e) => setSerialEquipo(e.target.value)}
        />

        <br /><br />

        {/* Campo estado */}
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

      <hr />

      {/* Título tabla */}
      <h2>Lista de Equipos</h2>

      {/* Tabla equipos */}
      <table border="1">

        {/* Encabezado */}
        <thead>

          <tr>

            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Serial</th>
            <th>Estado</th>
            <th>Acciones</th>

          </tr>

        </thead>

        {/* Cuerpo tabla */}
        <tbody>

          {/* Recorrer equipos */}
          {equipos.map((equipo) => (

            <tr key={equipo.id}>

              <td>{equipo.id}</td>
              <td>{equipo.nombreEquipo}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.serialEquipo}</td>
              <td>{equipo.estadoEquipo}</td>

              {/* Botón eliminar */}
              <td>

                <button
                  onClick={() => eliminarEquipo(equipo.id)}
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

// Exportar componente
export default App;