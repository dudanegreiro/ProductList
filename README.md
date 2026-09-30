# Meus Produtos — P1 Desenvolvimento Webmobile

**Nome completo:** Maria Eduarda Negreiro de Souza

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

## 📁 Estrutura do Projeto

```text
produtos-app/
├── app/                      # Pasta de rotas e navegação (Expo Router)
│   ├── produtos/             # Rotas dinâmicas de produtos
│   │   └── [id].tsx          # Tela de detalhe e alteração de situação do produto
│   ├── _layout.tsx           # Layout raiz com Stack Navigation e ProductProvider
│   ├── cadastro.tsx          # Tela de formulário para cadastro de novos produtos
│   └── index.tsx             # Tela inicial (Listagem de produtos ativos e inativos)
├── assets/                   # Recursos estáticos (ícones, imagens de splash)
├── src/                      # Código-fonte principal da aplicação
│   ├── components/           # Componentes reutilizáveis de interface
│   ├── context/              # Estado global (ProductContext e ProductProvider)
│   ├── types/                # Definições de tipos do TypeScript (ex: produto.ts)
│   ├── utils/                # Funções utilitárias e de validação/formatação
│   └── theme.ts              # Estilização global e constantes de tema
├── .gitignore                # Arquivos ignorados pelo Git
├── AGENTS.md                 # Configurações do ambiente de agentes
├── app.json                  # Configuração do Expo e Expo Router
├── package.json              # Dependências e scripts do projeto
├── README.md                 # Documentação do projeto
└── tsconfig.json             # Configurações de compilação do TypeScript
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


## Uso de IA

Foi usada IA como assistência.