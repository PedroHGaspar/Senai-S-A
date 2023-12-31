import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../style/listarSalas.css";

const Listarsalas = () => {
  const [salas, setSalas] = useState([]);
  const [newSalas, setNewSalas] = useState("");
  const [newQtdMax, setNewQtdMax] = useState("");
  const [newTipo, setNewTipo] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalas, setSelectedSalas] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      let api = `https://senai-back-end.onrender.com/salas/lista`;
      let response = await fetch(api);
      const data = await response.json();
      setSalas(data);
    } catch (error) {
      console.error("Deu ruim: ", error);
    }
  };

  //Modal de cadastro e edição
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSalas(null);
    setNewSalas("");
    setNewQtdMax("");
    setNewTipo("");

    setIsDeleteModalOpen(false);
  };
  //Modal de Delete
  const openDeleteModal = (idDelete) => {
    setIsDeleteModalOpen(true);
    setDeleteId(idDelete);
  };

  const handleNameChange = (e) => {
    setNewSalas(e.target.value);
  };
  const handleQtdMax = (e) => {
    setNewQtdMax(e.target.value);
  };
  const handleTipo = (e) => {
    setNewTipo(e.target.value);
  };

  //CADASTRO (POST)
  const handleCadastrar = async () => {
    const fetchData = async () => {
      //Gerador de ID que busca o ID mais alto, e adciona +1
      let id_creator = Math.random().toString(5).slice(2, 7);

      if (id_creator <= 99999) {
        try {
          let api = `https://senai-back-end.onrender.com/salas/postar`;
          const body = {
            id_sala: id_creator,
            num_sala: newSalas,
            qtd_maxima: newQtdMax,
            tipo: `${newTipo}`,
          };
          let response = await fetch(api, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          await response.json();
          console.log(id_creator);
        } catch (error) {
          console.error("Deu ruim: ", error);
        }
      } else {
        console.error("Unable to find a unique ID within the 5-digit limit.");
      }
    };

    await fetchData();
    closeModal();
    await fetchSalas();
  };

  //EXCLUSÃO (DELETE)
  const handleExcluir = async (id_sala) => {
    const fetchData = async () => {
      try {
        let api = `https://senai-back-end.onrender.com/salas/deletar/${id_sala}`;
        let response = await fetch(api, { method: "DELETE" });
        await response.json();
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    await fetchData();
    await fetchSalas();
    closeModal();
  };

  //EDIÇÃO (PUT)
  const handleEditar = (sala) => {
    setSelectedSalas(sala);
    setNewSalas(sala.num_sala);
    setNewQtdMax(sala.qtd_maxima);
    setNewTipo(sala.tipo);

    openModal();
  };

  const handleSalvarEdicao = async (id_sala) => {
    const fetchData = async () => {
      try {
        let api = `https://senai-back-end.onrender.com/salas/atualizar/${id_sala}`;
        let response = await fetch(api, {
          method: "PUT",
          body: JSON.stringify({
            num_sala: newSalas,
            qtd_maxima: newQtdMax,
            tipo: `${newTipo}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        await response.json();
      } catch (error) {
        console.error("Deu ruim: ", error);
      }
    };

    await fetchData();
    closeModal();
    await fetchSalas();
  };

  return (
    <div className="container">
      <h1 className="title-header">Lista de Salas</h1>
      <ul className="container-lista lista-scroll">
        {Object.values(salas.salasLista || {}).map((sala) => (
          <li className="lista-salas" key={sala.id_sala}>
            {sala.num_sala}
            <div className="buttons-lista">
              <button
                className="button-editar"
                onClick={() => handleEditar(sala)}
              >
                <FaEdit />
              </button>
              <button
                className="button-excluir"
                onClick={() => openDeleteModal(sala.id_sala)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={openModal} className="botao-cadastrar">
        Cadastrar Sala
      </button>
      {isModalOpen && (
        <div className="modal-background">
          <div className="modal">
            <h2>{selectedSalas ? "Editar sala" : "Cadastrar sala"}</h2>
            <div className="input-grupo-modal">
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
            </div>
            <div className="button-grupo-modal">
              <button
                className="botao-salvar-modal"
                onClick={
                  selectedSalas
                    ? () => handleSalvarEdicao(selectedSalas.id_sala)
                    : handleCadastrar
                }
              >
                {selectedSalas ? "Salvar" : "Cadastrar"}
              </button>
              <button onClick={closeModal} className="botao-fechar-modal">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="modal-background">
          <div className="modal">
            <h2>Tem certeza que deseja excluir?</h2>
            <div className="button-grupo-modal">
              <button
                className="botao-salvar-modal"
                onClick={() => handleExcluir(deleteId)}
              >
                Sim
              </button>
              <button onClick={closeModal} className="botao-fechar-modal">
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listarsalas;
