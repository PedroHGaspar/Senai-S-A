import React, { useState, useEffect, useRef } from "react";
import "../style/ensalamento.css";

const Ensalamento = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fase, setFase] = useState();
  const [curso, setCurso] = useState();

  useEffect(() => {
    fetchDisciplina();
    fetchProfessores();
    fetchSalas();
  }, []);

  const handleCurso = (evento) => {
    setCurso(evento.target.value); // atualiza o estado com o valor selecionado
  };

  const handleFase = (evento) => {
    setFase(evento.target.value); // atualiza o estado com o valor selecionado
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchDisciplina = async () => {
    try {
      let api = `https://senai-back-end.onrender.com/disciplina/lista`;
      let response = await fetch(api);
      const data = await response.json();
      setDisciplinas(data);
      console.log(data);
    } catch (error) {
      console.error("Deu ruim: ", error);
    }
  };
  const fetchProfessores = async () => {
    try {
      let api = `https://senai-back-end.onrender.com/professores/lista`;
      let response = await fetch(api);
      const data = await response.json();
      setProfessores(data);
      console.log(data);
    } catch (error) {
      console.error("Deu ruim: ", error);
    }
  };
  const fetchSalas = async () => {
    try {
      let api = `https://senai-back-end.onrender.com/salas/lista`;
      let response = await fetch(api);
      const data = await response.json();
      setSalas(data);
      console.log(data);
    } catch (error) {
      console.error("Deu ruim: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title-header">Ensalar</h1>
      <div className="inputs-ensalar">
        {/* escolher curso */}
        <select className="select-class" value={curso} onChange={handleCurso}>
          <option value="">Escolher Curso</option>
          <option value="Desenvolvimento">Desenvolvimento</option>
        </select>

        {/* escolher fase */}
        <select className="select-class" value={fase} onChange={handleFase}>
          <option value="">Escolher Fase</option>
          <option value="Fase 4">Fase 4</option>
        </select>
      </div>
      {fase && curso && (
        <>
          <ul
            className="container-lista lista-scroll"
            style={{ display: "flex", gap: "20px" }}
          >
            <div className="week-day">
              <h2>SEG</h2>
              <div>
                <button className="botao-cadastrar" onClick={openModal}>
                  Ensalar
                </button>
              </div>
            </div>
            <div className="week-day">
              <h2>TER</h2>
              <div>
                <button className="botao-cadastrar" onClick={openModal}>
                  Ensalar
                </button>
              </div>
            </div>
            <div className="week-day">
              <h2>QUA</h2>
              <div>
                <button className="botao-cadastrar" onClick={openModal}>
                  Ensalar
                </button>
              </div>
            </div>
            <div className="week-day">
              <h2>QUI</h2>
              <div>
                <button className="botao-cadastrar" onClick={openModal}>
                  Ensalar
                </button>
              </div>
            </div>
            <div className="week-day">
              <h2>SEX</h2>
              <div>
                <button className="botao-cadastrar" onClick={openModal}>
                  Ensalar
                </button>
              </div>
            </div>
          </ul>
        </>
      )}

      {isModalOpen && (
        <div className="modal-background">
          <div className="modal">
            {/* Professores Select */}
            {/* <div>Professor</div> */}
            <br />
            {professores && (
              <select className="select-class">
                <option>Escolher Professor</option>
                {Object.values(professores.professoresLista || {}).map(
                  (professor) => (
                    <option value={professor.nome} key={professor.id_prof}>
                      {professor.nome}
                    </option>
                  )
                )}
              </select>
            )}

            {/* Disciplinas Select */}
            {/* <div>Disciplina</div> */}
            <br />
            {disciplinas && (
              <select className="select-class">
                <option>Escolher Disciplina</option>
                {Object.values(disciplinas.disciplinasLista || {}).map(
                  (disciplina) => (
                    <option
                      value={disciplina.nm_disciplina}
                      key={disciplina.id_discip}
                    >
                      {disciplina.nm_disciplina}
                    </option>
                  )
                )}
              </select>
            )}

            {/* Salas Select */}
            {/* <div>Sala</div> */}
            <br />
            {salas && (
              <select className="select-class">
                <option>Escolher Sala</option>
                {Object.values(salas.salasLista || {}).map((sala) => (
                  <option value={sala.num_sala} key={sala.id_sala}>
                    {sala.num_sala}
                  </option>
                ))}
              </select>
            )}
            <div className="button-grupo-modal">
              <button onClick={closeModal} className="botao-cadastrar">
                Salvar
              </button>
              <button onClick={closeModal} className="botao-fechar-modal">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* caso não tenha escolhido fase ou curso não vai aparecer os dias da semana */}
      {(!fase || !curso) && (
        <>
          <ul className="container-lista lista-scroll"></ul>
        </>
      )}
    </div>
  );
};

export default Ensalamento;
