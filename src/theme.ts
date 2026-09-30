export const cores = {
  fundo: '#F1F5F3',
  superficie: '#FFFFFF',
  texto: '#14201C',
  textoSuave: '#55665F',
  borda: '#D6DFDA',
  primaria: '#0E6B57',
  primariaSuave: '#DDEFE9',
  inativo: '#7A5200',
  inativoSuave: '#FBEFD3',
  erro: '#B3261E',
  erroSuave: '#FCE9E7',
  trilhaSwitch: '#C3CEC8',
} as const;

export const espaco = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const raio = { md: 12, lg: 16, pilula: 999 } as const;

export const sombra = {
  shadowColor: '#0B1F18',
  shadowOpacity: 0.07,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
} as const;
