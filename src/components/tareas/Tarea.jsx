import React, { useContext } from "react";
import tareaContext from "./../../context/tareas/tareaContext";
import proyectoContext from "./../../context/proyectos/proyectoContext";

export const Tarea = ({ tarea }) => {
  // Extraer el proyecto seleccionado
  const { proyectoSeleccionado } = useContext(proyectoContext);
  // Obtener la función del contex de tarea
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } =
    useContext(tareaContext);

  // Extraer el proyecto
  const [proyectoActual] = proyectoSeleccionado;

  // Función que se ejecuta cuando el usuario presiona el botón de eliminar tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
  };

  // Función que modifica el estado de las tareas
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }

    actualizarTarea(tarea);
  };

  // Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <>
      <li className="tarea sombra">
        <p>{tarea.nombre}</p>

        <div className="estado">
          {tarea.estado ? (
            <button
              type="button"
              className="completo"
              onClick={() => cambiarEstado(tarea)}
            >
              Completo
            </button>
          ) : (
            <button
              type="button"
              className="incompleto"
              onClick={() => cambiarEstado(tarea)}
            >
              Incompleto
            </button>
          )}
        </div>

        <div className="acciones">
          <button
            type="button"
            className="btn btn-editar"
            onClick={() => seleccionarTarea(tarea)}
          >
            Editar
          </button>

          <button
            type="button"
            className="btn btn-secundario"
            onClick={() => tareaEliminar(tarea._id)}
          >
            Eliminar
          </button>
        </div>
      </li>
    </>
  );
};
