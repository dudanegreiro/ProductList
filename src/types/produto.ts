export type Produto = {
  /** Identificador estável, gerado no cadastro. */
  id: string;
  nome: string;
  /** Preço em reais. */
  preco: number;
  ativo: boolean;
};

export type NovoProduto = Omit<Produto, 'id'>;
