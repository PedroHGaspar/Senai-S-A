import React, { useState, useEffect, useRef } from 'react';
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

    const changeFactorRef = useRef(100);

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
                console.log(data)

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();


    }, [])

    const [newSalas, setNewSalas] = useState('');
    const [newQtdMax, setNewQtdMax] = useState('');
    const [newTipo, setNewTipo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSalas, setSelectedSalas] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSalas(null);
        setNewSalas('');
        setNewQtdMax('');
        setNewTipo('');
        changeFactorRef.current -= 1;

    }

    const handleNameChange = (e) => {
        setNewSalas(e.target.value);
    }
    const handleQtdMax = (e) => {
        setNewQtdMax(e.target.value);
    }
    const handleTipo = (e) => {
        setNewTipo(e.target.value);
    }

    const handleCadastrar = () => {
        const fetchData = async () => {
            console.log(newSalas)
            console.log(salas.salasLista.length)


            const idMaisAlto = Math.max(...salas.salasLista.map(sala => sala.id_sala));
            let id_creator = idMaisAlto + 1;

            console.log("Id criado: ", id_creator);

            if (id_creator <= 99999) {
                try {
                    let api = `http://localhost:3000/salas/postar`;
                    let response = await fetch(api, {
                        method: 'POST',
                        body: JSON.stringify({
                            "id_sala": id_creator,
                            "num_sala": newSalas,
                            "qtd_maxima": newQtdMax,
                            "tipo": `${newTipo}`
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    const data = await response.json();
                    setSalas(data);
                    console.log(data);
                    console.log(newSalas)

                } catch (error) {
                    console.error('Deu ruim: ', error)
                }
            } else {
                console.error('Unable to find a unique ID within the 5-digit limit.');
            }
        }

        fetchData();
        closeModal();
        // if (newSalas.trim() !== '') {
        //     const newId = salas.length + 1;
        //     setSalas([...salas, { id: newId, nome: newSalas }]);
        //     setNewSalas('');
        //     closeModal();
        // }
    }

    const handleExcluir = (id_sala) => {
        changeFactorRef.current += 1;

        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/salas/deletar/${id_sala}`;
                let response = await fetch(api, { method: 'DELETE' })
                const data = await response.json();
                setTurmas(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();
        // const updatedSalas = salas.filter(sala => sala.id !== salaId);
        // setSalas(updatedSalas);
    }

    const handleEditar = (sala) => {
        setSelectedSalas(sala);
        setNewSalas(sala.num_sala);
        setNewQtdMax(sala.qtd_maxima);
        setNewTipo(sala.tipo);

        openModal();
    }

    const handleSalvarEdicao = (id_sala) => {

        console.log('id_sala:', id_sala);
        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/salas/atualizar/${id_sala}`;
                let response = await fetch(api, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "num_sala": newSalas,
                        "qtd_maxima": newQtdMax,
                        "tipo": `${newTipo}`
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
        // if (newSalas.trim() !== '') {
        //     const updatedSalas = salas.map(sala => {
        //         if (sala.id === selectedSalas.id) {
        //             return { ...sala, nome: newSalas };
        //         }
        //         return sala;
        //     });
        //     setSalas(updatedSalas);
        //     setNewSalas('');
        //     setSelectedSalas(null);
        //     closeModal();
        // }
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
                            <button className='button-excluir' onClick={() => handleExcluir(sala.id_sala)}>
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
                            placeholder="Número da sala"
                            value={newSalas}
                            onChange={handleNameChange}
                        />
                        <input
                            type="text"
                            placeholder="Quantidade máxima de alunos"
                            value={newQtdMax}
                            onChange={handleQtdMax}
                        />
                        <input
                            type="text"
                            placeholder="Tipo de sala"
                            value={newTipo}
                            onChange={handleTipo}
                        />
                        <button onClick={selectedSalas ? () => handleSalvarEdicao(selectedSalas.id_sala) : handleCadastrar}>
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
