// Importar hooks React
import { useEffect, useState } from "react";

// Función principal
function App() {

  // =========================
  // ESTADOS FORMULARIO
  // =========================

  // ID equipo
  const [id, setId] = useState("");

  // Nombre equipo
  const [nombreEquipo, setNombreEquipo] = useState("");

  // Marca
  const [marca, setMarca] = useState("");

  // Serial
  const [serialEquipo, setSerialEquipo] = useState("");

  // Estado
  const [estadoEquipo, setEstadoEquipo] = useState("");

  // Lista equipos
  const [equipos, setEquipos] = useState([]);

  // Detectar modo edición
  const [modoEdicion, setModoEdicion] = useState(false);

  // =========================
  // GUARDAR EQUIPO
  // =========================

  const guardarEquipo = async (e) => {

    // Evitar recarga
    e.preventDefault();

    try {

      // URL según modo
      let url = "";

      if (modoEdicion) {

        url = "http://localhost:8081/OpenAlmacenBackend/actualizarEquipo";

      } else {

        url = "http://localhost:8081/OpenAlmacenBackend/guardarEquipo";

      }

      // Petición backend
      const respuesta = await fetch(
        url,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          // Datos enviados
          body:
            `id=${id}&nombreEquipo=${nombreEquipo}&marca=${marca}&serialEquipo=${serialEquipo}&estadoEquipo=${estadoEquipo}`

        }
      );

      // Obtener respuesta
      const texto = await respuesta.text();

      // Convertir JSON
      const datos = JSON.parse(texto);

      // Mostrar mensaje
      alert(datos.mensaje);

      // Limpiar formulario
      limpiarFormulario();

      // Actualizar tabla
      listarEquipos();

    } catch (error) {

      console.log("Error:", error);

      alert("Error de conexión");

    }

  };

  // =========================
  // LISTAR EQUIPOS
  // =========================

  const listarEquipos = async () => {

    try {

      // Consumir backend
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/listarEquipos"
      );

      // Convertir respuesta
      const texto = await respuesta.text();

      const datos = JSON.parse(texto);

      // Guardar lista
      setEquipos(datos);

    } catch (error) {

      console.log("Error:", error);

    }

  };

  // =========================
  // ELIMINAR EQUIPO
  // =========================

  const eliminarEquipo = async (id) => {

    try {

      // Petición backend
      const respuesta = await fetch(
        "http://localhost:8081/OpenAlmacenBackend/eliminarEquipo",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          // Enviar ID
          body: `id=${id}`

        }
      );

      // Convertir respuesta
      const texto = await respuesta.text();

      const datos = JSON.parse(texto);

      // Mostrar mensaje
      alert(datos.mensaje);

      // Actualizar tabla
      listarEquipos();

    } catch (error) {

      console.log("Error:", error);

    }

  };

  // =========================
  // EDITAR EQUIPO
  // =========================

  const editarEquipo = (equipo) => {

    // Activar modo edición
    setModoEdicion(true);

    // Cargar datos formulario
    setId(equipo.id);
    setNombreEquipo(equipo.nombreEquipo);
    setMarca(equipo.marca);
    setSerialEquipo(equipo.serialEquipo);
    setEstadoEquipo(equipo.estadoEquipo);

  };

  // =========================
  // LIMPIAR FORMULARIO
  // =========================

  const limpiarFormulario = () => {

    setId("");
    setNombreEquipo("");
    setMarca("");
    setSerialEquipo("");
    setEstadoEquipo("");

    setModoEdicion(false);

  };

  // =========================
  // EJECUTAR AL INICIAR
  // =========================

  useEffect(() => {

    listarEquipos();

  }, []);

  // =========================
  // INTERFAZ
  // =========================

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

        {/* Botón dinámico */}
        <button type="submit">

          {modoEdicion ? "Actualizar Equipo" : "Guardar Equipo"}

        </button>

        <br /><br />

        {/* Botón limpiar */}
        <button
          type="button"
          onClick={limpiarFormulario}
        >

          Limpiar

        </button>

      </form>

      <hr />

      {/* Tabla */}
      <h2>Lista de Equipos</h2>

      <table border="1">

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

        <tbody>

          {/* Recorrer equipos */}
          {equipos.map((equipo) => (

            <tr key={equipo.id}>

              <td>{equipo.id}</td>
              <td>{equipo.nombreEquipo}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.serialEquipo}</td>
              <td>{equipo.estadoEquipo}</td>

              {/* Acciones */}
              <td>

                {/* Editar */}
                <button
                  onClick={() => editarEquipo(equipo)}
                >

                  Editar

                </button>

                {" "}

                {/* Eliminar */}
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