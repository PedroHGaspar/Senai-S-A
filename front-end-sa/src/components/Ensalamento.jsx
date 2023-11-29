import React, { useState, useEffect } from "react";
import "../style/ensalamento.css";

const Ensalamento = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fase, setFase] = useState();
  const [curso, setCurso] = useState();
  const [selectedInfo, setSelectedInfo] = useState({
    professor: "",
    disciplina: "",
    sala: "",
    turma: "",
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchDisciplina();
    fetchProfessores();
    fetchSalas();
    fetchTurmas();
  }, []);

  const handleCurso = (evento) => {
    setCurso(evento.target.value);
  };

  const handleFase = (evento) => {
    setFase(evento.target.value);
  };

  const openModal = (day) => {
    setIsModalOpen(true);
    // Aqui você pode definir as informações iniciais se necessário
    setSelectedInfo({ professor: "", disciplina: "", sala: "", turma: "" ,day   });
  };

  const addCard = () => {
    setCards([...cards, selectedInfo]);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInfo({ professor: "", disciplina: "", sala: "",turma: "" ,day: ""   });
  };

  const fetchDisciplina = async () => {
    try {
      let api = `https://senai-back-end.onrender.com/disciplina/lista`;
      let response = await fetch(api);
      const data = await response.json();
      setDisciplinas(data);
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
    } catch (error) {
      console.error("Deu ruim: ", error);
    }
  };
  const fetchTurmas = async () => {
    try {
      let api = `https://senai-back-end.onrender.com/turmas/lista`;
      let response = await fetch(api);
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      console.error("Deu ruim: ", error);
    }
  };

  const days = ["SEG", "TER", "QUA", "QUI", "SEX"];

  return (
    <div className="container">
      <h1 className="title-header">Ensalar</h1>
      <div className="inputs-ensalar">
        <select className="select-class" value={curso} onChange={handleCurso}>
          <option value="">Escolher Curso</option>
          <option value="Desenvolvimento">Desenvolvimento</option>
        </select>

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
            {days.map((day, index) => (
              <div key={index} className="week-day">
                <h2>{day}</h2>
                <div>
                  <button
                    className="botao-cadastrar"
                    onClick={() => openModal(day)}
                  >
                    Ensalar
                  </button>
                </div>
                {cards
                  .filter((card) => card.day === day)
                  .map((card, cardIndex) => (
                    <div key={cardIndex} className="card">
                      <p>{card.professor}</p> 
                      <p>{card.disciplina}</p>
                      <p>{card.sala}</p>
                      <p>{card.turma}</p>
                    </div>
                  ))}
              </div>
            ))}
          </ul>
        </>
      )}

      {isModalOpen && (
        <div className="modal-background">
          <div className="modal">
            <br />
            {professores && (
              <select
                className="select-class"
                onChange={(e) =>
                  setSelectedInfo({
                    ...selectedInfo,
                    professor: e.target.value,
                  })
                }
              >
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

            <br />
            {disciplinas && (
              <select
                className="select-class"
                onChange={(e) =>
                  setSelectedInfo({
                    ...selectedInfo,
                    disciplina: e.target.value,
                  })
                }
              >
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

            <br />
            {salas && (
              <select
                className="select-class"
                onChange={(e) =>
                  setSelectedInfo({ ...selectedInfo, sala: e.target.value })
                }
              >
                <option>Escolher Sala</option>
                {Object.values(salas.salasLista || {}).map((sala) => (
                  <option value={sala.num_sala} key={sala.id_sala}>
                    {sala.num_sala}
                  </option>
                ))}
              </select>
            )}
            <br />
            {turmas && (
              <select
                className="select-class"
                onChange={(e) =>
                  setSelectedInfo({ ...selectedInfo, turma: e.target.value })
                }
              >
                <option>Escolher Turma</option>
                {Object.values(turmas.turmasLista || {}).map((turma) => (
                  <option value={turma.nm_turma} key={turma.id_turma}>
                    {turma.nm_turma}
                  </option>
                ))}
              </select> 
            )}
            <div className="button-grupo-modal">
              <button onClick={addCard} className="botao-salvar-modal">
                Salvar
              </button>
              <button onClick={closeModal} className="botao-fechar-modal">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {(!fase || !curso) && (
        <>
          <ul className="container-lista lista-scroll"></ul>
        </>
      )}
    </div>
  );
};

export default Ensalamento;
