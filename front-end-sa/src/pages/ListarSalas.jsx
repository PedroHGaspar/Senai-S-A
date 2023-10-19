import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../style/listarSalas.css"

const Listarsalas = () => {
    const [salas, setSalas] = useState([
        //Teste
        // { id: 1, nome: '400' },
        // { id: 2, nome: '401' },
        // { id: 3, nome: '402' },
        // { id: 4, nome: '403' },
        // { id: 5, nome: '404' },
        // { id: 6, nome: '405' },
        // { id: 7, nome: '406' },
    ]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/salas/lista`;

                // if (pesquisaNome) {
                //   api += `?name=${pesquisaNome}`
                // } else if (characterStatus) {
                //   api += `?status=${characterStatus}`
                // }

                let response = await fetch(api)
                const data = await response.json();
                setSalas(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();


    }, [])

    const [newSalas, setNewSalas] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSalas, setSelectedSalas] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSalas(null);
        setNewSalas('');
    }

    const handleNameChange = (e) => {
        setNewSalas(e.target.value);
    }

    const handleCadastrar = () => {
        if (newSalas.trim() !== '') {
            const newId = salas.length + 1;
            setSalas([...salas, { id: newId, nome: newSalas }]);
            setNewSalas('');
            closeModal();
        }
    }

    const handleExcluir = (salaId) => {
        const updatedSalas = salas.filter(sala => sala.id !== salaId);
        setSalas(updatedSalas);
    }

    const handleEditar = (sala) => {
        setSelectedSalas(sala);
        setNewSalas(sala.nome);
        openModal();
    }

    const handleSalvarEdicao = () => {
        if (newSalas.trim() !== '') {
            const updatedSalas = salas.map(sala => {
                if (sala.id === selectedSalas.id) {
                    return { ...sala, nome: newSalas };
                }
                return sala;
            });
            setSalas(updatedSalas);
            setNewSalas('');
            setSelectedSalas(null);
            closeModal();
        }
    }

    return (
        <div className='container'>
            <h1 className='title-header'>Lista de salas</h1>
            <ul className='container-lista lista-scroll'>
                {Object.values(salas.salasLista || {}).map(sala => (
                    <li className='lista-salas' key={sala.id_sala}>
                        {sala.num_sala}
                        <div className='buttons-lista'>
                            <button className='button-editar' onClick={() => handleEditar(sala)}>
                                <FaEdit />
                            </button>
                            <button className='button-excluir' onClick={() => handleExcluir(sala.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={openModal} className="botao-cadastrar">
                Cadastrar sala
            </button>
            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>{selectedSalas ? 'Editar sala' : 'Cadastrar sala'}</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={newSalas}
                            onChange={handleNameChange}
                        />
                        <button onClick={selectedSalas ? handleSalvarEdicao : handleCadastrar}>
                            {selectedSalas ? 'Salvar' : 'Cadastrar'}
                        </button>
                        <button onClick={closeModal}>Fechar Modal</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Listarsalas;
