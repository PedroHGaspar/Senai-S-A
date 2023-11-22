import React, { useState } from 'react';
import { FaChalkboardTeacher, FaUsers, FaDoorOpen, FaBookOpen, FaGraduationCap } from 'react-icons/fa';
import ListarProfessores from '../components/ListarProfessores';
import ListarTurma from '../components/ListarTurmas';
import ListarDisciplinas from '../components/ListarDisciplinas';
import ListarSalas from '../components/ListarSalas';
import Ensalamento from '../components/Ensalamento';
import "../style/home.css"
import senaiLogo from '../assets/senaiLogo.jpg'

const Home = () => {
    const [mostrarProfessores, setMostrarProfessores] = useState(true);
    const [mostrarTurma, setMostrarTurma] = useState(false);
    const [mostrarSala, setMostrarSala] = useState(false);
    const [mostrarDisciplina, setMostrarDisciplina] = useState(false);
    const [mostrarEnsalamento, setMostrarEnsalamento] = useState(false);

    const toggleProfessores = () => {
        setMostrarProfessores(true);
        setMostrarTurma(false);
        setMostrarSala(false);
        setMostrarDisciplina(false);
        setMostrarEnsalamento(false);
    }

    const toggleTurma = () => {
        setMostrarProfessores(false);
        setMostrarTurma(true);
        setMostrarSala(false);
        setMostrarDisciplina(false);
        setMostrarEnsalamento(false);
    }

    const toggleSala = () => {
        setMostrarProfessores(false);
        setMostrarTurma(false);
        setMostrarSala(true);
        setMostrarDisciplina(false);
        setMostrarEnsalamento(false);
    }

    const toggleDisciplinas = () => {
        setMostrarProfessores(false);
        setMostrarTurma(false);
        setMostrarSala(false);
        setMostrarDisciplina(true);
        setMostrarEnsalamento(false);
    }
    const toggleEnsalamento = () => {
        setMostrarProfessores(false);
        setMostrarTurma(false);
        setMostrarSala(false);
        setMostrarDisciplina(false);
        setMostrarEnsalamento(true);

    }

    return (
        <div className='container'>
            <div className='header-fixo'>
                <img className='senaiLogo' src={senaiLogo}/>
            </div>
            <section className='home'>
                <div>
                    <ul className='lista-container'>
                        <li className='lista-icones-menu' onClick={toggleProfessores}>
                            <FaChalkboardTeacher className='icon' /> <p>Professores</p>
                        </li>
                        <li className='lista-icones-menu' onClick={toggleTurma}>
                            <FaUsers className='icon' /> <p>Turmas</p>
                        </li>
                        <li className='lista-icones-menu' onClick={toggleSala}>
                            <FaDoorOpen className='icon' /> <p>Salas</p>
                        </li>
                        <li className='lista-icones-menu' onClick={toggleDisciplinas}>
                            <FaBookOpen className='icon' /> <p>Disciplinas</p>
                        </li>
                        <li className='lista-icones-menu' onClick={toggleEnsalamento}>
                            <FaGraduationCap className='icon' /> <p>Ensalar</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3></h3>
                    <div>
                        {mostrarProfessores && <ListarProfessores />}
                        {mostrarTurma && <ListarTurma />}
                        {mostrarSala && <ListarSalas />}
                        {mostrarDisciplina && <ListarDisciplinas />}
                        {mostrarEnsalamento && <Ensalamento />}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
