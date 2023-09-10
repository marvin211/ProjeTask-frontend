import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";

export const NuevaCuenta = () => {
  const navigate = useNavigate();

  // Obtener y extraer los valores del context
  const { alerta, mostrarAlerta } = useContext(alertaContext);

  const { mensaje, autenticado, registrarUsuario } = useContext(authContext);

  // En caso de que el usuario se haya autenticado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      navigate("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, navigate]);

  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });

  const { nombre, email, password, password2 } = usuario;

  const handleChange = ({ target }) => {
    guardarUsuario({
      ...usuario,
      [target.name]: target.value,
    });
  };

  // Cuando el usuario quiere iniciar sesión
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    // Password minimo de 6 caracteres
    if (password.trim().length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    // Los 2 passwords son iguales
    if (password.trim() !== password2.trim()) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }

    // Pasarlo al action
    registrarUsuario({ nombre, email, password }); //Se llama a la funcion del context para registrar al usuario
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una Cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              // autoComplete="off"
              onChange={handleChange}
              value={nombre}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              // autoComplete="off"
              onChange={handleChange}
              value={email}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password2">Confirmar Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Repite tu password"
              onChange={handleChange}
              value={password2}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};
