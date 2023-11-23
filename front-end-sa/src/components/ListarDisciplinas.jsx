import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../style/listarDisciplinas.css"

const ListarDisciplinas = () => {

    const [disciplinas, setDisciplinas] = useState([]);
    const [newDisciplina, setNewDisciplina] = useState('');
    const [newQtdDias, setNewQtdDias] = useState('');
    const [newNumFase, setNewNumFase] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDisciplinas, setSelectedDisciplinas] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let api = `https://senai-back-end.onrender.com/disciplina/lista`;
                let response = await fetch(api)
                const data = await response.json();
                setDisciplinas(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();
    }, [disciplinas])

    //Modal de cadastro e edição
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDisciplinas(null);
        setNewDisciplina('');
        setNewQtdDias('');
        setNewNumFase('');
    }

    const handleNameChange = (e) => {
        setNewDisciplina(e.target.value);
    }
    const handleQtdDias = (e) => {
        setNewQtdDias(e.target.value);
    }
    const handleNumFase = (e) => {
        setNewNumFase(e.target.value);
    }

    //CADASTRO (POST)
    const handleCadastrar = () => {
        const fetchData = async () => {

            //Gerador de ID que busca o ID mais alto, e adciona +1
            const idMaisAlto = Math.max(...disciplinas.disciplinasLista.map(disciplina => disciplina.id_discip));
            let id_creator = idMaisAlto + 1;

            if (id_creator <= 99999) {
                try {
                    let api = `https://senai-back-end.onrender.com/disciplina/postar`;
                    let response = await fetch(api, {
                        method: 'POST',
                        body: JSON.stringify({
                            "id_discip": id_creator,
                            "nm_disciplina": `${newDisciplina}`,
                            "qtd_dias": newQtdDias,
                            "num_fase": newNumFase
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    const data = await response.json();
                    setDisciplinas(data);
                    console.log(data);
                    console.log(newDisp)

                } catch (error) {
                    console.error('Deu ruim: ', error)
                }
            } else {
                console.error('Unable to find a unique ID within the 5-digit limit.');
            }
        }

        fetchData();
        closeModal();
    }

    //EXCLUSÃO (DELETE)
    const handleExcluir = (id_discip) => {
        const fetchData = async () => {
            try {
                let api = `https://senai-back-end.onrender.com/disciplina/deletar/${id_discip}`;
                let response = await fetch(api, { method: 'DELETE' })
                const data = await response.json();
                setDisciplinas(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();
    }

    //EDIÇÃO (PUT)
    const handleEditar = (disciplina) => {
        setSelectedDisciplinas(disciplina);
        setNewDisciplina(disciplina.nm_disciplina);
        setNewQtdDias(disciplina.qtd_dias);
        setNewNumFase(disciplina.num_fase);
        openModal();
    }

    const handleSalvarEdicao = (id_discip) => {

        const fetchData = async () => {
            try {
                let api = `https://senai-back-end.onrender.com/disciplina/atualizar/${id_discip}`;
                let response = await fetch(api, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "nm_disciplina": `${newDisciplina}`,
                        "qtd_dias": newQtdDias,
                        "num_fase": newNumFase
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await response.json();
                setSalas(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();
        closeModal();
    }

    return (
        <div className='container'>
            <h1 className='title-header'>Lista de Disciplinas</h1>
            <ul className='container-lista lista-scroll'>
                {Object.values(disciplinas.disciplinasLista || {}).map(disciplina => (
                    <li className='lista-disciplinas' key={disciplina.id_discip}>
                        {disciplina.nm_disciplina}
                        <div className='buttons-lista'>
                            <button className='button-editar' onClick={() => handleEditar(disciplina)}>
                                <FaEdit />
                            </button>
                            <button className='button-excluir' onClick={() => handleExcluir(disciplina.id_discip)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={openModal} className="botao-cadastrar">
                Cadastrar Disciplina
            </button>
            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>{selectedDisciplinas ? 'Editar disciplina' : 'Cadastrar disciplina'}</h2>
                        <div className='input-grupo-modal'>
                            <input

                                type="text"
                                placeholder="Nome"
                                value={newDisciplina}
                                onChange={handleNameChange}
                            />
                            <input

                                type="text"
                                placeholder="Quantidade de dias"
                                value={newQtdDias}
                                onChange={handleQtdDias}
                            />
                            <input

                                type="text"
                                placeholder="Número da Fase"
                                value={newNumFase}
                                onChange={handleNumFase}
                            />
                        </div>
                        <div className='button-grupo-modal'>
                            <button className='botao-salvar-modal' onClick={selectedDisciplinas ? () => handleSalvarEdicao(selectedDisciplinas.id_discip) : handleCadastrar}>
                                {selectedDisciplinas ? 'Salvar' : 'Cadastrar'}
                            </button>
                            <button onClick={closeModal} className="botao-fechar-modal">Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListarDisciplinas;
