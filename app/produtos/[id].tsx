import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Botao } from '../../src/components/Botao';
import { StatusBadge } from '../../src/components/StatusBadge';
import { useProdutos } from '../../src/context/ProdutosContext';
import { cores, espaco, raio, sombra } from '../../src/theme';
import { formatarPreco } from '../../src/utils/preco';

export default function TelaDetalhe() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { obterProduto, alternarAtivo } = useProdutos();
  // Sempre consulta o contexto: nada de cópia do produto na rota ou no estado local.
  const produto = id ? obterProduto(id) : undefined;

  function voltarParaInicio() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  if (!produto) {
    return (
      <SafeAreaView style={estilos.tela} edges={['left', 'right', 'bottom']}>
        <View style={estilos.conteudo}>
          <View style={estilos.cartao}>
            <Text accessibilityRole="header" style={estilos.titulo}>
              Produto não encontrado
            </Text>
            <Text style={estilos.texto}>
              Não existe produto com este identificador. Ele pode ter sido perdido ao recarregar o
              aplicativo.
            </Text>
          </View>
          <Botao titulo="Voltar para a tela inicial" onPress={voltarParaInicio} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.tela} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <View style={estilos.cartao}>
          <Text accessibilityRole="header" style={estilos.titulo}>
            {produto.nome}
          </Text>
          <Text style={estilos.preco}>{formatarPreco(produto.preco)}</Text>

          <View style={estilos.divisor} />

          <View style={estilos.linha}>
            <Text style={estilos.rotulo}>Situação</Text>
            <StatusBadge ativo={produto.ativo} />
          </View>
        </View>

        <Botao
          titulo={produto.ativo ? 'Desativar produto' : 'Ativar produto'}
          variante={produto.ativo ? 'alerta' : 'primario'}
          onPress={() => alternarAtivo(produto.id)}
        />
        <Botao titulo="Voltar para a tela inicial" variante="secundario" onPress={voltarParaInicio} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espaco.lg, gap: espaco.md },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.lg,
    padding: espaco.xl,
    gap: espaco.sm,
    ...sombra,
  },
  titulo: { fontSize: 24, fontWeight: '800', color: cores.texto },
  texto: { fontSize: 16, lineHeight: 22, color: cores.textoSuave },
  preco: { fontSize: 30, fontWeight: '800', color: cores.primaria },
  divisor: { height: 1, backgroundColor: cores.borda, marginVertical: espaco.sm },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rotulo: { fontSize: 15, fontWeight: '700', color: cores.textoSuave },
});
