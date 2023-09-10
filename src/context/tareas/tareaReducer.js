
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPLEAR_TAREA
} from '../../types';

export default (state, action) => {

    switch (action.type) {

        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload,
            }

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [action.payload, ...state.tareasproyecto],
                errortarea: false,
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload),
            }

        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true,
            }

        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea), // Si los ids coinciden, entonces ejecuta el payload con los nuevos datos, sino, se retorna la tarea tal cual está

            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload,
            }

        case LIMPLEAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null,
            }

        default:
            return state;
    }
}