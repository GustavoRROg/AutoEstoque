// Formatação manual (não depende de Intl, funciona em qualquer dispositivo).
const separarMilhares = (inteiro) => inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// 85990.5 -> "R$ 85.990,50"
export function formatarMoeda(valor) {
  const [inteiro, centavos] = Number(valor || 0).toFixed(2).split('.');
  return `R$ ${separarMilhares(inteiro)},${centavos}`;
}

// 1250000 -> "R$ 1,25 mi" | 85990 -> "R$ 86 mil"
export function formatarMoedaCompacta(valor) {
  const v = Number(valor || 0);
  if (v >= 1000000) return `R$ ${(v / 1000000).toFixed(2).replace('.', ',')} mi`;
  if (v >= 1000) return `R$ ${Math.round(v / 1000)} mil`;
  return formatarMoeda(v);
}

// 45000 -> "45.000 km"
export const formatarKm = (km) => `${separarMilhares(String(Math.round(Number(km || 0))))} km`;

// ABC1234 -> "ABC-1234" (hífen que não quebra linha) | ABC1D23 (Mercosul) fica igual
export const formatarPlaca = (placa = '') => (/^[A-Z]{3}\d{4}$/.test(placa) ? `${placa.slice(0, 3)}\u2011${placa.slice(3)}` : placa);
