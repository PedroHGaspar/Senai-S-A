import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../style/listarProfessores.css"

const ListarProfessores = () => {
    const [professores, setProfessores] = useState([
        //Teste:
        // { id: 1, nome: 'Pedro Henrique Gaspar' },
        // { id: 2, nome: 'Vitou Hugo de Souza' },
        // { id: 3, nome: 'Alexandre o Grande Rei de Todos' },
        // { id: 4, nome: 'Eric - O Mais Temível' },
        // { id: 5, nome: 'Enzo - O Mais Poderoso' },
    ]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/professores/lista`;

                // if (pesquisaNome) {
                //   api += `?name=${pesquisaNome}`
                // } else if (characterStatus) {
                //   api += `?status=${characterStatus}`
                // }

                let response = await fetch(api)
                const data = await response.json();
                setProfessores(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();


    }, [])

    const [newProfessorName, setNewProfessorName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProfessor(null);
        setNewProfessorName('');
    }

    const handleNameChange = (e) => {
        setNewProfessorName(e.target.value);
    }

    const handleCadastrar = () => {
        if (newProfessorName.trim() !== '') {
            const newId = professores.length + 1;
            setProfessores([...professores, { id: newId, nome: newProfessorName }]);
            setNewProfessorName('');
            closeModal();
        }
    }

    const handleExcluir = (professorId) => {
        const updatedProfessores = professores.filter(professor => professor.id !== professorId);
        setProfessores(updatedProfessores);
    }

    const handleEditar = (professor) => {
        setSelectedProfessor(professor);
        setNewProfessorName(professor.nome);
        openModal();
    }

    const handleSalvarEdicao = () => {
        if (newProfessorName.trim() !== '') {
            const updatedProfessores = professores.map(professor => {
                if (professor.id === selectedProfessor.id) {
                    return { ...professor, nome: newProfessorName };
                }
                return professor;
            });
            setProfessores(updatedProfessores);
            setNewProfessorName('');
            setSelectedProfessor(null);
            closeModal();
        }
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
                            <button className='button-excluir' onClick={() => handleExcluir(professor.id)}>
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
                        <input
                            type="text"
                            placeholder="Nome"
                            value={newProfessorName}
                            onChange={handleNameChange}
                        />
                        <button onClick={selectedProfessor ? handleSalvarEdicao : handleCadastrar}>
                            {selectedProfessor ? 'Salvar' : 'Cadastrar'}
                        </button>
                        <button onClick={closeModal}>Fechar Modal</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListarProfessores;
