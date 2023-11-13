import React, { useState } from 'react';
import { FaChalkboardTeacher, FaUsers, FaDoorOpen, FaBookOpen } from 'react-icons/fa';
import ListarProfessores from '../components/ListarProfessores';
import ListarTurma from '../components/ListarTurmas';
import ListarDisciplinas from '../components/ListarDisciplinas';
import ListarSalas from '../components/ListarSalas';
import "../style/home.css"
import senaiLogo from '../assets/senaiLogo.jpg'

const Home = () => {
    const [mostrarProfessores, setMostrarProfessores] = useState(true);
    const [mostrarTurma, setMostrarTurma] = useState(false);
    const [mostrarSala, setMostrarSala] = useState(false);
    const [mostrarDisciplina, setMostrarDisciplina] = useState(false);

    const toggleProfessores = () => {
        setMostrarProfessores(true);
        setMostrarTurma(false);
        setMostrarSala(false);
        setMostrarDisciplina(false);
    }

    const toggleTurma = () => {
        setMostrarProfessores(false);
        setMostrarTurma(true);
        setMostrarSala(false);
        setMostrarDisciplina(false);
    }

    const toggleSala = () => {
        setMostrarProfessores(false);
        setMostrarTurma(false);
        setMostrarSala(true);
        setMostrarDisciplina(false);
    }

    const toggleDisciplinas = () => {
        setMostrarProfessores(false);
        setMostrarTurma(false);
        setMostrarSala(false);
        setMostrarDisciplina(true);
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
                    </ul>
                </div>
                <div>
                    <h3></h3>
                    <div>
                        {mostrarProfessores && <ListarProfessores />}
                        {mostrarTurma && <ListarTurma />}
                        {mostrarSala && <ListarSalas />}
                        {mostrarDisciplina && <ListarDisciplinas />}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
