import React, { useState } from 'react';

function App() {
  const [professores, setProfessores] = useState([]);
  const [nome, setNome] = useState('');
  const [horarios, setHorarios] = useState('');
  const [disciplinas, setDisciplinas] = useState('');

  const handleCadastrar = (e) => {
    e.preventDefault();
    const novoProfessor = {
      nome,
      horarios,
      disciplinas,
    };
    setProfessores([...professores, novoProfessor]);
    setNome('');
    setHorarios('');
    setDisciplinas('');
  };

  const handleEditar = (index) => {
    const professor = professores[index];
    setNome(professor.nome);
    setHorarios(professor.horarios);
    setDisciplinas(professor.disciplinas);
    setProfessores(professores.filter((_, i) => i !== index));
  };

  const handleExcluir = (index) => {
    setProfessores(professores.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Cadastrar Professor  </h1>
      <form onSubmit={handleCadastrar}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Professor:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="horarios">Preferências de Horários:</label>
          <input type="text" id="horarios" value={horarios} onChange={(e) => setHorarios(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="disciplinas">Disciplinas que Pode Ministrar:</label>
          <input type="text" id="disciplinas" value={disciplinas} onChange={(e) => setDisciplinas(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
          
      </form>
      <h2>Lista de Professores</h2>
        <button type="submit">Ensalar</button>
      <ul>
        {professores.map((professor, index) => (
          <li key={index}>
            {professor.nome} - {professor.horarios} - {professor.disciplinas}
            <button onClick={() => handleEditar(index)}>Editar</button>
            <button onClick={() => handleExcluir(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;