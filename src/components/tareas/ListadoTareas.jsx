import React, { useContext } from "react";
import { Tarea } from "./Tarea";
import proyectoContext from "./../../context/proyectos/proyectoContext";
import tareaContext from "./../../context/tareas/tareaContext";

export const ListadoTareas = () => {
  // Extraer proyectos de state inicial
  const { proyectoSeleccionado, eliminarProyecto } =
    useContext(proyectoContext);

  // Obtener las tareas del proyecto
  const { tareasproyecto } = useContext(tareaContext);

  // Sino hay proyecto seleccionado es decir es null
  if (!proyectoSeleccionado) return <h2>Selecciona un proyecto</h2>;

  const [proyectoActual] = proyectoSeleccionado;

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareasproyecto.map((tarea) => <Tarea key={tarea._id} tarea={tarea} />)
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto
      </button>
    </>
  );
};
