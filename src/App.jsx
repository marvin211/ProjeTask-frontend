import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./components/auth/Login";
import { NuevaCuenta } from "./components/auth/NuevaCuenta";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/TareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/AuthState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from "./components/rutas/RutaPrivada";
import Rutas from "./components/rutas/Rutas";

const App = () => {
  const token = localStorage.getItem("token"); //Se obtiene el token del local storage
  if (token) {
    tokenAuth(token);
  }

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/nueva-cuenta" element={<NuevaCuenta />} />

                <Route
                  path="*"
                  element={
                    <RutaPrivada>
                      <Rutas />
                    </RutaPrivada>
                  }
                />
              </Routes>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
};

export default App;
