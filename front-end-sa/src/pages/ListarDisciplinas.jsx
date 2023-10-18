import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../style/listarDisciplinas.css"

const ListarDisciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([
        { id: 1, nome: 'Teste de Sistemas' },
        { id: 2, nome: 'Eletrônica' },
        { id: 3, nome: 'Aplicativos' },
        { id: 4, nome: 'Banco de Dados' },
        { id: 5, nome: 'Fluxograma' },
    ]);

    const [newDisciplina, setNewDisciplina] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDisciplinas, setSelectedDisciplinas] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDisciplinas(null);
        setNewDisciplina('');
    }

    const handleNameChange = (e) => {
        setNewDisciplina(e.target.value);
    }

    const handleCadastrar = () => {
        if (newDisciplina.trim() !== '') {
            const newId = disciplinas.length + 1;
            setDisciplinas([...disciplinas, { id: newId, nome: newDisciplina }]);
            setNewDisciplina('');
            closeModal();
        }
    }

    const handleExcluir = (disciplinaId) => {
        const updateddisciplinas = disciplinas.filter(disciplina => disciplina.id !== disciplinaId);
        setDisciplinas(updateddisciplinas);
    }

    const handleEditar = (disciplina) => {
        setSelectedDisciplinas(disciplina);
        setNewDisciplina(disciplina.nome);
        openModal();
    }

    const handleSalvarEdicao = () => {
        if (newDisciplina.trim() !== '') {
            const updateddisciplinas = disciplinas.map(disciplina => {
                if (disciplina.id === selectedDisciplinas.id) {
                    return { ...disciplina, nome: newDisciplina };
                }
                return disciplina;
            });
            setDisciplinas(updateddisciplinas);
            setNewDisciplina('');
            setSelectedDisciplinas(null);
            closeModal();
        }
    }

    return (
        <div className='container'>
            <h1 className='title-header'>Lista de disciplinas</h1>
            <ul className='container-lista lista-scroll'>
                {disciplinas.map(disciplina => (
                    <li className='lista-disciplinas' key={disciplina.id}>
                        {disciplina.nome}
                        <div className='buttons-lista'>
                            <button className='button-editar' onClick={() => handleEditar(disciplina)}>
                                <FaEdit />
                            </button>
                            <button className='button-excluir' onClick={() => handleExcluir(disciplina.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={openModal} className="botao-cadastrar">
                Cadastrar disciplina
            </button>
            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>{selectedDisciplinas ? 'Editar disciplina' : 'Cadastrar disciplina'}</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={newDisciplina}
                            onChange={handleNameChange}
                        />
                        <button onClick={selectedDisciplinas ? handleSalvarEdicao : handleCadastrar}>
                            {selectedDisciplinas ? 'Salvar' : 'Cadastrar'}
                        </button>
                        <button onClick={closeModal}>Fechar Modal</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListarDisciplinas;
