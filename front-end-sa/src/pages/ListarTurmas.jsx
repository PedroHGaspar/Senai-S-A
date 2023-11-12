import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../style/listarTurmas.css"

const ListarTurmas = () => {
    const [turmas, setTurmas] = useState([
        //Teste:
        // { id: 1, nome: 'N1' },
        // { id: 2, nome: 'N2' },
        // { id: 3, nome: 'N3' },
        // { id: 4, nome: 'N4' },
        // { id: 5, nome: 'N5' },
        // { id: 6, nome: 'N6' },
    ]);

    const changeFactorRef = useRef(100);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/turmas/lista`;

                // if (pesquisaNome) {
                //   api += `?name=${pesquisaNome}`
                // } else if (characterStatus) {
                //   api += `?status=${characterStatus}`
                // }

                let response = await fetch(api)
                const data = await response.json();
                setTurmas(data);
                //console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();


    }, [])

    const [newTurma, setNewTurma] = useState('');
    const [newQtdAlunos, setNewQtdAlunos] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTurmas, setSelectedTurmas] = useState(null);


    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTurmas(null);
        setNewTurma('');
        setNewQtdAlunos('');
        changeFactorRef.current -= 1;

    }

    const handleNameChange = (e) => {
        setNewTurma(e.target.value);
    }
    const handleQtdAlunos = (e) => {
        setNewQtdAlunos(e.target.value);
    }
    const handleCadastrar = () => {

        const fetchData = async () => {
            console.log(newTurma)
            console.log(turmas.turmasLista.length)


            const idMaisAlto = Math.max(...turmas.turmasLista.map(turma => turma.id_turma));
            let id_creator = idMaisAlto + 1;

            console.log("Id criado: ", id_creator);

            if (id_creator <= 99999) {
                try {
                    let api = `http://localhost:3000/turmas/postar`;
                    let response = await fetch(api, {
                        method: 'POST',
                        body: JSON.stringify({
                            "id_turma": id_creator,
                            "nm_turma": `${newTurma}`,
                            "qtd_alunos": newQtdAlunos
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    const data = await response.json();
                    setTurmas(data);
                    console.log(data);
                    console.log(newTurma)

                } catch (error) {
                    console.error('Deu ruim: ', error)
                }
            } else {
                console.error('Unable to find a unique ID within the 5-digit limit.');
            }
        }

        fetchData();
        closeModal();
        // if (newTurma.trim() !== '') {
        //     const newId = turmas.length + 1;
        //     setTurmas([...turmas, { id: newId, nome: newTurma }]);
        //     setNewTurma('');
        //     closeModal();
        // }
    }

    const handleExcluir = (id_turma) => {
        changeFactorRef.current += 1;

        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/turmas/deletar/${id_turma}`;
                let response = await fetch(api, { method: 'DELETE' })
                const data = await response.json();
                setTurmas(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();
        // const updatedTurmas = turmas.filter(turma => turma.id !== turmasId);
        // setTurmas(updatedTurmas);
    }

    const handleEditar = (turma) => {
        setSelectedTurmas(turma);
        setNewTurma(turma.nm_turma);
        setNewQtdAlunos(turma.qtd_alunos)
        openModal();
    }

    const handleSalvarEdicao = (id_turma) => {

        console.log('id_turma:', id_turma);
        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/turmas/atualizar/${id_turma}`;
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
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();
        closeModal();
        // if (newTurma.trim() !== '') {
        //     const updatedTurmas = turmas.map(turma => {
        //         if (turma.id === selectedTurmas.id) {
        //             return { ...turma, nome: newTurma };
        //         }
        //         return turma;
        //     });
        //     setTurmas(updatedTurmas);
        //     setNewTurma('');
        //     setSelectedTurmas(null);
        //     closeModal();
        // }
    }

    return (
        <div className='container'>
            <h1 className='title-header'>Lista de turmas</h1>
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
                Cadastrar turma
            </button>
            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>{selectedTurmas ? 'Editar turma' : 'Cadastrar turma'}</h2>
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

                        <button onClick={selectedTurmas ? () => handleSalvarEdicao(selectedTurmas.id_turma) : handleCadastrar}>
                            {selectedTurmas ? 'Salvar' : 'Cadastrar'}
                        </button>
                        <button onClick={closeModal}>Fechar Modal</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListarTurmas;
