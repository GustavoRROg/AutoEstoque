const BASE_URL = '';

export const CATEGORIAS = ['Hatch', 'Sedan', 'SUV', 'Picape', 'Utilitário'];
export const STATUS = ['Disponível', 'Reservado', 'Vendido'];

const veiculosIniciais = [
  { id: '1', marca: 'Volkswagen', modelo: 'Polo', ano: 2023, placa: 'QWE1A23', km: 18500, preco: 98900, categoria: 'Hatch', status: 'Disponível', responsavel: 'Sistema' },
  { id: '2', marca: 'Chevrolet', modelo: 'Onix', ano: 2022, placa: 'RTY4B56', km: 32000, preco: 76500, categoria: 'Hatch', status: 'Reservado', responsavel: 'Sistema' },
  { id: '3', marca: 'Toyota', modelo: 'Corolla', ano: 2021, placa: 'FGH7890', km: 45200, preco: 129900, categoria: 'Sedan', status: 'Disponível', responsavel: 'Sistema' },
  { id: '4', marca: 'Honda', modelo: 'Civic', ano: 2020, placa: 'JKL2C34', km: 61000, preco: 118000, categoria: 'Sedan', status: 'Vendido', responsavel: 'Sistema' },
  { id: '5', marca: 'Jeep', modelo: 'Compass', ano: 2023, placa: 'ZXC5D67', km: 15800, preco: 172000, categoria: 'SUV', status: 'Disponível', responsavel: 'Sistema' },
  { id: '6', marca: 'Hyundai', modelo: 'Creta', ano: 2024, placa: 'VBN8E90', km: 6200, preco: 154500, categoria: 'SUV', status: 'Disponível', responsavel: 'Sistema' },
  { id: '7', marca: 'Fiat', modelo: 'Toro', ano: 2022, placa: 'MNB1234', km: 48000, preco: 139900, categoria: 'Picape', status: 'Reservado', responsavel: 'Sistema' },
  { id: '8', marca: 'Fiat', modelo: 'Fiorino', ano: 2021, placa: 'POI3F45', km: 72300, preco: 89900, categoria: 'Utilitário', status: 'Disponível', responsavel: 'Sistema' },
];

export async function buscarVeiculos() {
  if (BASE_URL === '') {
    return veiculosIniciais;
  }
  const resposta = await fetch(BASE_URL + '/veiculos');
  return resposta.json();
}

async function salvar(recurso, dados) {
  if (BASE_URL === '') {
    return { ...dados, id: String(Date.now()) };
  }
  const resposta = await fetch(BASE_URL + '/' + recurso, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return resposta.json();
}

export function salvarVeiculo(veiculo) {
  return salvar('veiculos', veiculo);
}

export function salvarUsuario(usuario) {
  return salvar('usuarios', usuario);
}
