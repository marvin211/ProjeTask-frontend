import clienteAxios from "./axios";

const tokenAuth = token => {

    if (token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token; //El header se llama x-auth-token y va a tener el token.
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token']; //Si no hay token, lo borra.
    }

}

export default tokenAuth;