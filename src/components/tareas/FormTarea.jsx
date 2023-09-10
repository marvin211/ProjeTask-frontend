import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "./../../context/tareas/tareaContext";

export const FormTarea = () => {
  // Extraer si un proyecto está activo
  const { proyectoSeleccionado } = useContext(proyectoContext);

  // Obtener la función del contex de tarea
  const {
    errortarea,
    tareaseleccionada,
    agregarTareas,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = useContext(tareaContext);

  // Si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      setTarea(tareaseleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  const [tarea, setTarea] = useState({
    nombre: "",
  });

  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if (!proyectoSeleccionado) return null;

  const [proyectoActual] = proyectoSeleccionado; //se obtiene el proyecto seleccionado del context del proyecto

  // Leer los valores del formulario
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  // Función para agregar la tarea al proyecto actual
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Si es edición o si es nueva tarea
    if (tareaseleccionada === null) {
      // Tarea nueva
      // Agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;

      agregarTareas(tarea);
    } else {
      // Actualizar tarea existente
      actualizarTarea(tarea);
      limpiarTarea();
    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    // Reiniciar el form
    setTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};
