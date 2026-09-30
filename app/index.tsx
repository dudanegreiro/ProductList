import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Botao } from '../src/components/Botao';
import { SecaoProdutos } from '../src/components/SecaoProdutos';
import { useProdutos } from '../src/context/ProdutosContext';
import { cores, espaco } from '../src/theme';

export default function TelaInicial() {
  const router = useRouter();
  const { produtos } = useProdutos();

  // Partes derivadas da mesma lista (sem estado próprio).
  const ativos = useMemo(() => produtos.filter((p) => p.ativo), [produtos]);
  const inativos = useMemo(() => produtos.filter((p) => !p.ativo), [produtos]);

  const abrirDetalhe = (id: string) => router.push(`/produtos/${id}`);

  return (
    <SafeAreaView style={estilos.tela} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.apresentacao}>
          Consulte o que você oferece e marque cada produto como ativo ou inativo.
        </Text>
        <Botao titulo="Cadastrar novo produto" onPress={() => router.push('/cadastro')} />
        <SecaoProdutos
          titulo="Produtos ativos"
          produtos={ativos}
          mensagemVazia="Nenhum produto ativo no momento."
          onSelecionar={abrirDetalhe}
        />
        <SecaoProdutos
          titulo="Produtos inativos"
          produtos={inativos}
          mensagemVazia="Nenhum produto inativo no momento."
          onSelecionar={abrirDetalhe}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espaco.lg, gap: espaco.xl },
  apresentacao: { fontSize: 15, lineHeight: 21, color: cores.textoSuave },
});
