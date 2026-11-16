/*
 * Serviço de acesso à API RESTful (GET e POST).
 *
 * Para usar uma API na nuvem, crie um projeto gratuito em https://mockapi.io
 * com os recursos "veiculos" e "usuarios" e cole a URL abaixo, por exemplo:
 *   export const BASE_URL = 'https://6650a1b2c3d4e5f6a7b8c9d0.mockapi.io/api/v1';
 *
 * Com a URL vazia, ou se a API falhar, o app usa um vetor local
 * (os dados ficam salvos enquanto o app estiver aberto).
 */
export const BASE_URL = '';

export const CATEGORIAS = ['Hatch', 'Sedan', 'SUV', 'Picape', 'Utilitário'];
export const STATUS = ['Disponível', 'Reservado', 'Vendido'];

const bancoLocal = {
  veiculos: [
    { id: '1', marca: 'Volkswagen', modelo: 'Polo Highline', ano: 2023, placa: 'QWE1A23', km: 18500, preco: 98900, categoria: 'Hatch', status: 'Disponível', responsavel: 'Sistema' },
    { id: '2', marca: 'Chevrolet', modelo: 'Onix LT', ano: 2022, placa: 'RTY4B56', km: 32000, preco: 76500, categoria: 'Hatch', status: 'Reservado', responsavel: 'Sistema' },
    { id: '3', marca: 'Toyota', modelo: 'Corolla XEi', ano: 2021, placa: 'FGH7890', km: 45200, preco: 129900, categoria: 'Sedan', status: 'Disponível', responsavel: 'Sistema' },
    { id: '4', marca: 'Honda', modelo: 'Civic EXL', ano: 2020, placa: 'JKL2C34', km: 61000, preco: 118000, categoria: 'Sedan', status: 'Vendido', responsavel: 'Sistema' },
    { id: '5', marca: 'Jeep', modelo: 'Compass Longitude', ano: 2023, placa: 'ZXC5D67', km: 15800, preco: 172000, categoria: 'SUV', status: 'Disponível', responsavel: 'Sistema' },
    { id: '6', marca: 'Hyundai', modelo: 'Creta Platinum', ano: 2024, placa: 'VBN8E90', km: 6200, preco: 154500, categoria: 'SUV', status: 'Disponível', responsavel: 'Sistema' },
    { id: '7', marca: 'Fiat', modelo: 'Toro Volcano', ano: 2022, placa: 'MNB1234', km: 48000, preco: 139900, categoria: 'Picape', status: 'Reservado', responsavel: 'Sistema' },
    { id: '8', marca: 'Fiat', modelo: 'Fiorino Endurance', ano: 2021, placa: 'POI3F45', km: 72300, preco: 89900, categoria: 'Utilitário', status: 'Disponível', responsavel: 'Sistema' },
  ],
  usuarios: [],
};

async function requisicao(recurso, opcoes = {}) {
  const resposta = await fetch(`${BASE_URL}/${recurso}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  });
  if (!resposta.ok) throw new Error(`Erro ${resposta.status} em /${recurso}`);
  return resposta.json();
}

// GET: retorna { dados, origem }
async function listar(recurso) {
  if (BASE_URL) {
    try {
      return { dados: await requisicao(recurso), origem: 'nuvem' };
    } catch (erro) {
      console.warn('GET falhou, usando dados locais:', erro.message);
    }
  }
  return { dados: [...bancoLocal[recurso]], origem: 'local' };
}

// POST: retorna { dados, origem }
async function salvar(recurso, registro) {
  if (BASE_URL) {
    try {
      const dados = await requisicao(recurso, { method: 'POST', body: JSON.stringify(registro) });
      return { dados, origem: 'nuvem' };
    } catch (erro) {
      console.warn('POST falhou, salvando localmente:', erro.message);
    }
  }
  const novo = { ...registro, id: String(Date.now()) };
  bancoLocal[recurso].push(novo);
  return { dados: novo, origem: 'local' };
}

export const getVeiculos = () => listar('veiculos');
export const getUsuarios = () => listar('usuarios');
export const postVeiculo = (veiculo) => salvar('veiculos', veiculo);
export const postUsuario = (usuario) => salvar('usuarios', usuario);
