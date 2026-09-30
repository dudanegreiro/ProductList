import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { NovoProduto, Produto } from '../types/produto';

export type ProdutosContextData = {
  produtos: Produto[];
  adicionarProduto: (dados: NovoProduto) => void;
  alternarAtivo: (id: string) => void;
  obterProduto: (id: string) => Produto | undefined;
};

const ProdutosContext = createContext<ProdutosContextData | undefined>(undefined);

export function ProdutosProvider({ children }: { children: ReactNode }) {
  // A lista começa vazia e vive só em memória (recarregar o app a esvazia).
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const contador = useRef(0);

  const adicionarProduto = useCallback((dados: NovoProduto) => {
    // O id é gerado fora do updater para que ele seja puro.
    contador.current += 1;
    const id = `${Date.now().toString(36)}-${contador.current}`;
    const novo: Produto = { id, ...dados };
    // Sem mutação: novo array com os objetos existentes preservados.
    setProdutos((anterior) => [...anterior, novo]);
  }, []);

  const alternarAtivo = useCallback((id: string) => {
    // Sem mutação: map cria novo array; só o produto do id ganha novo objeto.
    setProdutos((anterior) =>
      anterior.map((p) => (p.id === id ? { ...p, ativo: !p.ativo } : p)),
    );
  }, []);

  const obterProduto = useCallback(
    (id: string) => produtos.find((p) => p.id === id),
    [produtos],
  );

  const valor = useMemo<ProdutosContextData>(
    () => ({ produtos, adicionarProduto, alternarAtivo, obterProduto }),
    [produtos, adicionarProduto, alternarAtivo, obterProduto],
  );

  return <ProdutosContext.Provider value={valor}>{children}</ProdutosContext.Provider>;
}

export function useProdutos(): ProdutosContextData {
  const contexto = useContext(ProdutosContext);
  if (!contexto) {
    throw new Error('useProdutos deve ser usado dentro de ProdutosProvider.');
  }
  return contexto;
}
