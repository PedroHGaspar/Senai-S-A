import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../style/listarDisciplinas.css"

const ListarDisciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([
        //Teste:
        // { id: 1, nome: 'Teste de Sistemas' },
        // { id: 2, nome: 'Eletrônica' },
        // { id: 3, nome: 'Aplicativos' },
        // { id: 4, nome: 'Banco de Dados' },
        // { id: 5, nome: 'Fluxograma' },
    ]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/disciplina/lista`;

                // if (pesquisaNome) {
                //   api += `?name=${pesquisaNome}`
                // } else if (characterStatus) {
                //   api += `?status=${characterStatus}`
                // }

                let response = await fetch(api)
                const data = await response.json();
                setDisciplinas(data);
                //console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();


    }, [disciplinas])

    const [newDisciplina, setNewDisciplina] = useState('');
    const [newQtdDias, setNewQtdDias] = useState('');
    const [newNumFase, setNewNumFase] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDisciplinas, setSelectedDisciplinas] = useState(null);

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

    const handleCadastrar = () => {

        const fetchData = async () => {
            console.log(newDisciplina)
            console.log(disciplinas.disciplinasLista.length)


            //We have to make this dont duplicate you know
            let id_creator = disciplinas.disciplinasLista.length + 2
            

            try {
                let api = `http://localhost:3000/disciplina/postar`;
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
        }

        fetchData();
        closeModal();
        // if (newDisciplina.trim() !== '') {
        //     const newId = disciplinas.length + 1;
        //     setDisciplinas([...disciplinas, { id: newId, nome: newDisciplina }]);
        //     setNewDisciplina('');
        //     closeModal();
        // }
    }

    const handleExcluir = (id_discip) => {
        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/disciplina/deletar/${id_discip}`;
                let response = await fetch(api, { method: 'DELETE' })
                const data = await response.json();
                setDisciplinas(data);
                console.log(data);

            } catch (error) {
                console.error('Deu ruim: ', error)
            }
        }

        fetchData();
        // const updat
        // const updateddisciplinas = disciplinas.filter(disciplina => disciplina.id !== disciplinaId);
        // setDisciplinas(updateddisciplinas);
    }

    const handleEditar = (disciplina) => {
        setSelectedDisciplinas(disciplina);
        openModal();
    }

    const handleSalvarEdicao = (id_discip) => {

        console.log('id_discip:', id_discip);
        const fetchData = async () => {
            try {
                let api = `http://localhost:3000/disciplina/atualizar/${id_discip}`;
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
        // if (newDisciplina.trim() !== '') {
        //     const updateddisciplinas = disciplinas.map(disciplina => {
        //         if (disciplina.id === selectedDisciplinas.id) {
        //             return { ...disciplina, nome: newDisciplina };
        //         }
        //         return disciplina;
        //     });
        //     setDisciplinas(updateddisciplinas);
        //     setNewDisciplina('');
        //     setSelectedDisciplinas(null);
        //     closeModal();
        // }
    }

    return (
        <div className='container'>
            <h1 className='title-header'>Lista de disciplinas</h1>
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
                        <button onClick={selectedDisciplinas ? () => handleSalvarEdicao(selectedDisciplinas.id_discip) : handleCadastrar}>
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
