import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/cadastrar-professor" element={<CadastrarProfessor />} /> */}

                {/* <Route path="/ListarProfessores" element={<ListarProfessores />} />
                <Route path="/ListarTurmas" element={<ListarTurmas />} />
                <Route path="/ListarSalas" element={<ListarSalas />} />
                <Route path="/ListarDisciplinas" element={<ListarDisciplinas />} />
                <Route path="/Ensalamento" element={<Ensalamento />} /> */}
            </Routes>
        </Router>
    );
}

export default AppRouter;