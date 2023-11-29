import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../style/listarProfessores.css"

const ListarProfessores = () => {

    const [professores, setProfessores] = useState([]);
    const [newProfessorName, setNewProfessorName] = useState('');
    const [newDisp, setNewDisp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        fetchProfessores();
    }, [])

    const fetchProfessores = async () => {
        try {
            let api = `https://senai-back-end.onrender.com/professores/lista`;
            let response = await fetch(api)
            const data = await response.json();
            setProfessores(data);

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
        setSelectedProfessor(null);
        setNewProfessorName('');
        setNewDisp('');
        setIsDeleteModalOpen(false)
    }
    //Modal de Delete
    const openDeleteModal = (idDelete) => {
        setIsDeleteModalOpen(true);
        setDeleteId(idDelete);
    }

    const handleNameChange = (e) => {
        setNewProfessorName(e.target.value);
    }
    const handleDispChange = (e) => {
        setNewDisp(e.target.value)
    }

    //CADASTRO (POST)
    const handleCadastrar = async () => {
        const fetchData = async () => {

            //Gerador de ID que busca o ID mais alto, e adciona +1
            const idMaisAlto = Math.max(...professores.professoresLista.map(professor => professor.id_prof));
            let id_creator = idMaisAlto + 1;

            if (id_creator <= 99999) {
                try {
                    let api = `https://senai-back-end.onrender.com/professores/postar`;
                    const body = {
                        id_prof: id_creator,
                        nome: `${newProfessorName}`,
                        disp_semana: `${newDisp}`
                    }
                    let response = await fetch(api, {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    });
                    await response.json();
                } catch (error) {
                    console.error('Deu ruim: ', error);
                }
            } else {
                console.error('Unable to find a unique ID within the 5-digit limit.');
            }
        };

        await fetchData();
        closeModal();
        await fetchProfessores();
    };

    //EXCLUSÃO (DELETE)
    const handleExcluir = async (id_prof) => {
        
        const fetchData = async () => {
            try {
                let api = `https://senai-back-end.onrender.com/professores/deletar/${id_prof}`;
                let response = await fetch(api, { method: 'DELETE' })
                await response.json();

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        await fetchData();
        closeModal();
        await fetchProfessores();
        
    }

    //EDIÇÃO (PUT)
    const handleEditar = (professor) => {
        setSelectedProfessor(professor);
        setNewProfessorName(professor.nome);
        setNewDisp(professor.disp_semana)
        openModal();
    }

    const handleSalvarEdicao = async (id_prof) => {

        const fetchData = async () => {
            try {
                let api = `https://senai-back-end.onrender.com/professores/atualizar/${id_prof}`;
                let response = await fetch(api, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "nome": `${newProfessorName}`,
                        "disp_semana": `${newDisp}`
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                await response.json();

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        await fetchData();
        await fetchProfessores();
        closeModal();
    }

    return (
        <div className='container'>
            <h1 className='title-header'>Lista de Professores</h1>
            <ul className='container-lista lista-scroll'>
                {Object.values(professores.professoresLista || {}).map(professor => (
                    <li className='lista-professores' key={professor.id_prof}>
                        {professor.nome}
                        <div className='buttons-lista'>
                            <button className='button-editar' onClick={() => handleEditar(professor)}>
                                <FaEdit />
                            </button>
                            <button className='button-excluir' onClick={() => openDeleteModal(professor.id_prof)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}

            </ul>
            <button onClick={openModal} className="botao-cadastrar">
                Cadastrar Professor
            </button>
            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>{selectedProfessor ? 'Editar Professor' : 'Cadastrar Professor'}</h2>
                        <div className='input-grupo-modal'>
                            <input

                                type="text"
                                placeholder="Nome"
                                value={newProfessorName}
                                onChange={handleNameChange}
                            />
                            <input

                                type="text"
                                placeholder="Disponibilidade"
                                value={newDisp}
                                onChange={handleDispChange}
                            />
                        </div>
                        <div className='button-grupo-modal'>
                            <button className='botao-salvar-modal' onClick={selectedProfessor ? () => handleSalvarEdicao(selectedProfessor.id_prof) : handleCadastrar}>
                                {selectedProfessor ? 'Salvar' : 'Cadastrar'}
                            </button>

                            <button onClick={closeModal} className="botao-fechar-modal">Fechar</button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>Tem certeza que deseja excluir?</h2>
                        <div className='button-grupo-modal'>
                            <button className='botao-salvar-modal' onClick={() => handleExcluir(deleteId)}>
                                Sim
                            </button>
                            <button onClick={closeModal} className="botao-fechar-modal">Não</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListarProfessores;
