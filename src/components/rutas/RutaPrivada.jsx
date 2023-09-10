import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import authContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ children }) => {
  // Si el usuario esta autenticado
  const { autenticado, cargando, usuarioAutenticado } = useContext(authContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return !autenticado && !cargando ? ( //Si no esta autenticado y si no esta cargando, se redirecciona al login
    <Navigate to="/" />
  ) : (
    children
  ); //Si esta autenticado, se muestra el contenido que se le pasa por props
};

export default RutaPrivada;
