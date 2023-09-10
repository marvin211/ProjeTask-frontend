import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';


export default (state, action) => {

    switch (action.type) {

        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:

            return {
                ...state,
                token: action.payload.token, //Guardamos el token en el state.
                autenticado: true, //El usuario se autentico. 
                mensaje: null, //Limpiamos el mensaje de error. 

                cargando: false //Ya no esta cargando.
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload, //Guardamos el usuario que viene en el payload. 
                cargando: false
            }

        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token'); //Eliminamos el token del local storage.
            return {
                ...state,
                token: null, //Limpiamos el token.
                mensaje: action.payload, //Guardamos el mensaje de error
                cargando: false
            }

        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: null,
                cargando: false
            }

        default: return state;
    }

};