import React, { createContext, useContext, useEffect, useState } from 'react';
import { getVeiculos, getUsuarios, postVeiculo, postUsuario } from '../services/api';
import { normalizarPlaca } from '../utils/validacoes';

// Estado global compartilhado pelas 4 telas (comunicação indireta).
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [origemDados, setOrigemDados] = useState('local');

  async function carregarDados() {
    setCarregando(true);
    setErro(null);
    try {
      const [respVeiculos, respUsuarios] = await Promise.all([getVeiculos(), getUsuarios()]);
      setVeiculos(respVeiculos.dados);
      setUsuarios(respUsuarios.dados);
      setOrigemDados(respVeiculos.origem);
    } catch (e) {
      setErro('Não foi possível carregar os dados.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function cadastrarUsuario(usuario) {
    if (usuarios.some(({ cpf }) => cpf === usuario.cpf)) {
      throw new Error('Já existe um usuário com este CPF.');
    }
    const { dados } = await postUsuario({ ...usuario, criadoEm: new Date().toISOString() });
    setUsuarios((lista) => [...lista, dados]);
    return dados;
  }

  async function lancarVeiculo(veiculo) {
    if (veiculos.some(({ placa }) => normalizarPlaca(placa) === veiculo.placa)) {
      throw new Error('Já existe um veículo com esta placa no estoque.');
    }
    const { dados } = await postVeiculo({ ...veiculo, criadoEm: new Date().toISOString() });
    setVeiculos((lista) => [...lista, dados]);
    return dados;
  }

  return (
    <AppContext.Provider
      value={{ usuarios, veiculos, carregando, erro, origemDados, carregarDados, cadastrarUsuario, lancarVeiculo }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook customizado: const { usuarios, veiculos } = useApp();
export function useApp() {
  const contexto = useContext(AppContext);
  if (!contexto) throw new Error('useApp deve ser usado dentro de <AppProvider>');
  return contexto;
}
