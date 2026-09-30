/**
 * O RF2 diz que o preço "pode ser igual a zero", mas o cenário 4 do roteiro
 * (Tabela 2) lista "0" como entrada recusada. Os dois textos se contradizem.
 * Esta constante decide o comportamento: true = segue o RF2 (zero aceito).
 */
export const PERMITIR_PRECO_ZERO = true;

export type ResultadoPreco =
  | { valido: true; valor: number }
  | { valido: false; erro: string };

export function validarPreco(entrada: string): ResultadoPreco {
  const texto = entrada.trim();

  if (texto === '') {
    return { valido: false, erro: 'Informe o preço.' };
  }
  if (!/^[0-9.,]+$/.test(texto)) {
    return { valido: false, erro: 'Use apenas números, vírgula ou ponto (sem sinal).' };
  }

  // parte inteira, separador opcional (vírgula ou ponto) e casas decimais
  const partes = /^(\d+)(?:[.,](\d+))?$/.exec(texto);
  if (!partes) {
    return { valido: false, erro: 'Formato inválido. Exemplos: 12, 12.5, 12,50.' };
  }

  const inteiro = partes[1];
  const decimais = partes[2] ?? '';

  if (decimais.length > 2) {
    return { valido: false, erro: 'Use no máximo duas casas decimais.' };
  }
  if (inteiro.length > 9) {
    return { valido: false, erro: 'Valor muito grande.' };
  }

  const valor = Number(`${inteiro}.${decimais === '' ? '0' : decimais}`);

  if (!PERMITIR_PRECO_ZERO && valor === 0) {
    return { valido: false, erro: 'O preço deve ser maior que zero.' };
  }

  return { valido: true, valor };
}

/** 12.5 -> "R$ 12,50" */
export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}
