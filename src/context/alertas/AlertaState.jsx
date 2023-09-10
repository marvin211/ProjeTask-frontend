import { useReducer } from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  // Definir un state inicial
  const initialState = {
    alerta: null,
  };

  // Definir el reducer
  const [state, dispatch] = useReducer(alertaReducer, initialState);

  // Funciones

  // Muestra una alerta
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });

    // Después de 5 segundos, se oculta la alerta
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
        // ocultarAlerta
      }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
