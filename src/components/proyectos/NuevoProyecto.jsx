import React, { useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

export const NuevoProyecto = () => {
  //useContext para poder acceder al state del context
  const {
    formNuevoProyecto,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = useContext(proyectoContext);

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //state para guardar el arreglo de proyectos
  const [proyectos, guardarProyectos] = useState([]);

  // Extraer nombre de proyecto
  const { nombre } = proyecto;

  const handleChange = ({ target }) => {
    guardarProyecto({
      ...proyecto,
      [target.name]: target.value,
    });
  };

  // Cuando el usuario envia un proyecto
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    // Agregar al state
    agregarProyecto(proyecto);

    // Reiniciar el form
    guardarProyecto({
      nombre: "",
    });
  };

  // Mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formNuevoProyecto ? (
        <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del Proyecto"
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {errorFormulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </>
  );
};
