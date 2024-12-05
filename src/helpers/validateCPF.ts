export function validateCPF(cpf: string): boolean {
  const cleanCpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cleanCpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cleanCpf.substring(10, 11))) {
    return false;
  }

  return true;
}
