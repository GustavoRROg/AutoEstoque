// Funções puras de máscara e validação usadas nos formulários.

export const somenteNumeros = (texto = '') => texto.replace(/\D/g, '');

// 123.456.789-09
export function mascararCPF(texto) {
  const n = somenteNumeros(texto).slice(0, 11);
  return n
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// (11) 98765-4321
export function mascararTelefone(texto) {
  const n = somenteNumeros(texto).slice(0, 11);
  if (n.length <= 2) return n.length ? `(${n}` : '';
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

export const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// Validação oficial dos dígitos verificadores do CPF.
export function cpfValido(cpf) {
  const n = somenteNumeros(cpf);
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  const digito = (base) => {
    const soma = base.split('').reduce((acc, num, i) => acc + Number(num) * (base.length + 1 - i), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  const d1 = digito(n.slice(0, 9));
  const d2 = digito(n.slice(0, 10));
  return d1 === Number(n[9]) && d2 === Number(n[10]);
}

// Placa: aceita padrão antigo (ABC1234) e Mercosul (ABC1D23).
export const normalizarPlaca = (texto = '') => texto.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
export const placaValida = (placa) => /^[A-Z]{3}\d[A-Z0-9]\d{2}$/.test(normalizarPlaca(placa));
