# Meus Produtos — P1 Desenvolvimento Webmobile

**Nome completo:** _(preencher)_
**Matrícula:** _(preencher)_

App em React Native + Expo + TypeScript para pequenos comerciantes cadastrarem produtos e marcarem cada um como ativo ou inativo. Expo Router (Stack), estado compartilhado por um `ProdutosProvider`, sem persistência (recarregar o app esvazia a lista).

## Instalação e execução

```bash
npm install
npx expo install --fix    # alinha as versões das dependências ao SDK instalado
npx expo start            # a = Android | i = iOS | w = web
```

Cenários 8 e 9 (id inexistente / sem histórico): na web, abra `http://localhost:8081/produtos/abc`.

**Plataforma testada:** _(preencher: ex. Expo Go no Android / navegador)_

## Verificações

- `npx tsc --noEmit`: _(preencher com o resultado após rodar)_
- Cenários 1 a 9 da Tabela 2: _(preencher, marcando cada um)_

## Estrutura

```
app/                          só telas e layouts
  _layout.tsx                 <ProdutosProvider> envolvendo o <Stack>
  index.tsx                   tela inicial (Produtos ativos / inativos)
  cadastro.tsx                tela de cadastro (acessada pela inicial)
  produtos/[id].tsx           detalhe (rota dinâmica)
src/
  types/produto.ts            tipos Produto e NovoProduto
  context/ProdutosContext.tsx contexto, provider e hook useProdutos
  utils/preco.ts              validarPreco e formatarPreco
  theme.ts                    cores, espaçamentos, raios
  components/                 Botao, CampoTexto, ProdutoItem, SecaoProdutos, StatusBadge
```

## Perguntas da seção de explicação individual

**1. Onde o provider está montado? Por que isso permite compartilhar a lista?**
Em `app/_layout.tsx`: `<ProdutosProvider>` envolve o `<Stack>`. Todas as telas (inicial, cadastro, detalhe) são renderizadas dentro do Stack, portanto dentro do provider, e leem o mesmo estado via `useProdutos()`. Há uma única instância, então há um único `useState` com a lista.

**2. Estado local, provider e derivados.**
- *Local:* valores em edição do formulário (`nome`, `preco`, `ativo`, `nomeTocado`, `precoTocado`) em `app/cadastro.tsx`.
- *Provider:* a lista `produtos` e as operações `adicionarProduto`, `alternarAtivo` e `obterProduto` (`src/context/ProdutosContext.tsx`).
- *Derivados:* `ativos` e `inativos` (`useMemo` + `filter` em `app/index.tsx`); `nomeValido`, `resultadoPreco`, `podeCadastrar` e as mensagens de erro (calculados a cada render em `cadastro.tsx`); o produto do detalhe (`obterProduto(id)` em `app/produtos/[id].tsx`).

**3. Como a rota identifica o produto? Por que consultar o contexto?**
Pela rota dinâmica `app/produtos/[id].tsx`: o id vem de `useLocalSearchParams` e o produto de `obterProduto(id)`. A navegação passa só o id (`router.push('/produtos/' + id)`). Consultar o contexto evita uma cópia desatualizada: ao ativar/desativar, o provider atualiza a lista e o detalhe re-renderiza com o dado atual. Também permite tratar id inexistente ("Produto não encontrado") e abrir a rota direto pela URL.

**4. Qual função ativa/desativa? Atualização sem mutação? Recarregar?**
`alternarAtivo(id)` em `src/context/ProdutosContext.tsx`:
`setProdutos(anterior => anterior.map(p => p.id === id ? { ...p, ativo: !p.ativo } : p))`.
Usa o estado anterior e `map`, que cria um novo array; só o produto com aquele id ganha um novo objeto (os demais mantêm a referência). Nada é mutado, então o React detecta a mudança e re-renderiza. Como a lista vive apenas em memória (`useState`, começando `[]`), recarregar ou fechar o app a esvazia.

## Decisões e limitações conhecidas

- **Preço zero:** o RF2 diz que o preço "pode ser igual a zero", mas o cenário 4 da Tabela 2 lista `0` entre as entradas recusadas. Implementei conforme o RF2 (zero aceito). Para recusar, mude `PERMITIR_PRECO_ZERO` para `false` em `src/utils/preco.ts`.
- Preço: sem sinal, sem letras, vírgula ou ponto, no máximo 2 casas. `12,` e `.5` são recusados.
- Ids gerados com `Date.now()` + contador (`useRef`), únicos mesmo com nomes iguais.
- Depois de cadastrar, o app volta à inicial com `router.dismissTo('/')`, sem mensagem de sucesso (permitido pelo RF2).
- A situação aparece por escrito ("Ativo"/"Inativo") e com marcador de forma diferente (cheio/vazio), não só por cor.

## Fontes consultadas

_(preencher: documentação do Expo Router, React Native, TypeScript, etc.)_

## Uso de IA

Foi usada IA como assistência. A sessão completa (prompts e respostas) deve ser anexada à entrega, conforme a seção 5.
