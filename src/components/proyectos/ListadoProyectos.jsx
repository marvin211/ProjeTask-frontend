import React, { useContext, useEffect } from "react";
import { Proyecto } from "./Proyecto";

import proyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";

export const ListadoProyectos = () => {
  //Aquí se utiliza el hook useContext de React para acceder al contexto de un componente llamado proyectoContext.
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const { alerta, mostrarAlerta } = useContext(alertaContext);

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    //Obtener proyectos de la base de datos
    obtenerProyectos();
  }, [mensaje]);

  //Revisar si proyectos tiene contenido
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}

      {proyectos.map((proyecto) => (
        <Proyecto key={proyecto._id} proyecto={proyecto} />
      ))}
    </ul>
  );
};
