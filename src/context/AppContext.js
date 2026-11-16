import React, { createContext, useContext, useEffect, useState } from 'react';
import { buscarVeiculos, salvarVeiculo, salvarUsuario } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarVeiculos() {
    setCarregando(true);
    setErro('');
    try {
      const lista = await buscarVeiculos();
      setVeiculos(lista);
    } catch (e) {
      setErro('Não foi possível carregar o estoque.');
    }
    setCarregando(false);
  }

  useEffect(() => {
    carregarVeiculos();
  }, []);

  async function cadastrarUsuario(usuario) {
    const novo = await salvarUsuario(usuario);
    setUsuarios([...usuarios, novo]);
  }

  async function lancarVeiculo(veiculo) {
    const novo = await salvarVeiculo(veiculo);
    setVeiculos([...veiculos, novo]);
  }

  return (
    <AppContext.Provider
      value={{ usuarios, veiculos, carregando, erro, carregarVeiculos, cadastrarUsuario, lancarVeiculo }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
