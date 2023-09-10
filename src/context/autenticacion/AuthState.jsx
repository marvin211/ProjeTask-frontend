import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"), //Si existe un token en el localStorage, lo guardamos en el state
    autenticado: null, //Si el usuario esta autenticado
    usuario: null, //Los datos del usuario
    mensaje: null, //Los mensajes de error

    cargando: true, //Cuando se esta cargando la aplicacion
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Las funciones

  // Registrar un usuario
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      // Guardamos el token el localStorage
      localStorage.setItem("token", respuesta.data.token);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg, //El mensaje de error que vamos enviar al reducer
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  // Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);

      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // Cuando el usuario inicia sesion
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      localStorage.setItem("token", respuesta.data.token); //Guardamos el token en el localStorage

      // Una vez que inicie sesion exitosamente
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });

      // Obtener el usuario autenticado
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response);

      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  // Cierra la sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,

        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
