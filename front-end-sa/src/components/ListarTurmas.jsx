import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../style/listarTurmas.css"

const ListarTurmas = () => {

    const [turmas, setTurmas] = useState([]);
    const [newTurma, setNewTurma] = useState('');
    const [newQtdAlunos, setNewQtdAlunos] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTurmas, setSelectedTurmas] = useState(null);

    useEffect(() => {
        fetchTurmas();
    }, [])

    const fetchTurmas = async () => {
        try {
            let api = `https://senai-back-end.onrender.com/turmas/lista`;
            let response = await fetch(api)
            const data = await response.json();
            setTurmas(data);

        } catch (error) {
            console.error('Deu ruim: ', error)
        }
    }

    //Modal de cadastro e edição
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTurmas(null);
        setNewTurma('');
        setNewQtdAlunos('');
    }

    const handleNameChange = (e) => {
        setNewTurma(e.target.value);
    }
    const handleQtdAlunos = (e) => {
        setNewQtdAlunos(e.target.value);
    }

    //CADASTRO (POST)
    const handleCadastrar = async () => {
        const fetchData = async () => {

            //Gerador de ID que busca o ID mais alto, e adciona +1
            const idMaisAlto = Math.max(...turmas.turmasLista.map(turma => turma.id_turma));
            let id_creator = idMaisAlto + 1;

            if (id_creator <= 99999) {
                try {
                    let api = `https://senai-back-end.onrender.com/turmas/postar`;
                    const body = {
                        id_turma: id_creator,
                        nm_turma: `${newTurma}`,
                        qtd_alunos: newQtdAlunos
                    }
                    let response = await fetch(api, {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    const data = await response.json();
                    setTurmas(data);

                } catch (error) {
                    console.error('Deu ruim: ', error)
                }
            } else {
                console.error('Unable to find a unique ID within the 5-digit limit.');
            }
        }

        await fetchData();
        closeModal();
        await fetchTurmas();
    }

    //EXCLUSÃO (DELETE)
    const handleExcluir = async (id_turma) => {

        const fetchData = async () => {
            try {
                let api = `https://senai-back-end.onrender.com/turmas/deletar/${id_turma}`;
                let response = await fetch(api, { method: 'DELETE' })
                await response.json();

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        await fetchData();
        await fetchTurmas();
    }

    //EDIÇÃO (PUT)
    const handleEditar = (turma) => {
        setSelectedTurmas(turma);
        setNewTurma(turma.nm_turma);
        setNewQtdAlunos(turma.qtd_alunos)
        openModal();
    }

    const handleSalvarEdicao = async (id_turma) => {

        const fetchData = async () => {
            try {
                let api = `https://senai-back-end.onrender.com/turmas/atualizar/${id_turma}`;
                let response = await fetch(api, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "nm_turma": `${newTurma}`,
                        "qtd_alunos": newQtdAlunos
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await response.json();
                setTurmas(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        await fetchData();
        closeModal();
        await fetchTurmas();
    }

    return (
        <div className='container'>
            <h1 className='title-header'>Lista de Turmas</h1>
            <ul className='container-lista lista-scroll'>
                {Object.values(turmas.turmasLista || {}).map(turma => (
                    <li className='lista-turma' key={turma.id_turma}>
                        {turma.nm_turma}
                        <div className='buttons-lista'>
                            <button className='button-editar' onClick={() => handleEditar(turma)}>
                                <FaEdit />
                            </button>
                            <button className='button-excluir' onClick={() => handleExcluir(turma.id_turma)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={openModal} className="botao-cadastrar">
                Cadastrar Turma
            </button>
            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>{selectedTurmas ? 'Editar turma' : 'Cadastrar turma'}</h2>
                        <div className='input-grupo-modal'>
                            <input

                                type="text"
                                placeholder="Nome"
                                value={newTurma}
                                onChange={handleNameChange}
                            />
                            <input

                                type="text"
                                placeholder="Quantidades de alunos"
                                value={newQtdAlunos}
                                onChange={handleQtdAlunos}
                            />
                        </div>
                        <div className='button-grupo-modal'>
                            <button className='botao-salvar-modal' onClick={selectedTurmas ? () => handleSalvarEdicao(selectedTurmas.id_turma) : handleCadastrar}>
                                {selectedTurmas ? 'Salvar' : 'Cadastrar'}
                            </button>
                            <button onClick={closeModal} className="botao-fechar-modal">Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListarTurmas;
