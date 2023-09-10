
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case FORMULARIO_PROYECTO:
            return { //Retorna el state
                ...state, //una copia del state
                formNuevoProyecto: true
            }

        case OBTENER_PROYECTOS:

            return {
                ...state,
                proyectos: action.payload //Se actualiza la propiedad proyectos del state con el valor action.payload
            }

        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload], //Se toma una copia del arreglo de proyectos y se le agrega el nuevo proyecto.
                formNuevoProyecto: false,
                errorFormulario: false
            }

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoSeleccionado: state.proyectos.filter(proyecto => proyecto._id === action.payload), //Se retorna el proyecto que tenga el mismo id que el que se encuentra en action.payload 
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyectoSeleccionado: null
            }

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}