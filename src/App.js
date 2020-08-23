import React, {useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] =useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('repositories');

      const { data } = response;

      return setRepositories(data);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      title: `Novo Projeto ${Date.now()}`,
      url: 'https://github.com/sandrojsd/gostack11-desafio-conceitos-reactjs',
      techs: ['Reajs', 'React Native'],
      likes: 0,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
              <a href={repository.url} target="_blank">
              {repository.title}
              </a>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
        }
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
