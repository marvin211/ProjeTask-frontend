import { Routes, Route } from "react-router-dom";

import { Proyectos } from "../proyectos/Proyectos";

const Rutas = () => {
  return (
    <Routes>
      <Route exact path="/proyectos" element={<Proyectos />} />
    </Routes>
  );
};

export default Rutas;
