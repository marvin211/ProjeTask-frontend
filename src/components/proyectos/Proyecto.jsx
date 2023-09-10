import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

export const Proyecto = ({ proyecto }) => {
  // Obtener el state de proyectos
  const { proyectoSeleccionado, proyectoActual } = useContext(proyectoContext);

  // Obtener la funcion del context de tarea
  const { obtenerTareas } = useContext(tareaContext);

  // Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id);

    // Obtener las tareas del proyecto
    obtenerTareas(id); //Filtrar las tareas del proyecto.
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};
