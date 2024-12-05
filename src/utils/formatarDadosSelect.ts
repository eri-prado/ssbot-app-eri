export function formatarDadosSelect(
  keyValue: string,
  keyLabel: string,
  dados: any[]
) {
  return dados.map((dado: { [key: string]: any }) => ({
    value: dado[keyValue],
    label: dado[keyLabel],
    ...dado,
  }));
}
