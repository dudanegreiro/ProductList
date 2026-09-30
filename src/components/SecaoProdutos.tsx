import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Produto } from '../types/produto';
import { cores, espaco, raio } from '../theme';
import { ProdutoItem } from './ProdutoItem';

type Props = {
  titulo: string;
  produtos: Produto[];
  mensagemVazia: string;
  onSelecionar: (id: string) => void;
};

export function SecaoProdutos({ titulo, produtos, mensagemVazia, onSelecionar }: Props) {
  return (
    <View style={estilos.secao}>
      <View style={estilos.cabecalho}>
        <Text accessibilityRole="header" style={estilos.titulo}>
          {titulo}
        </Text>
        <View style={estilos.contador}>
          <Text style={estilos.textoContador}>{produtos.length}</Text>
        </View>
      </View>
      {produtos.length === 0 ? (
        <Text style={estilos.vazio}>{mensagemVazia}</Text>
      ) : (
        produtos.map((produto) => (
          <ProdutoItem key={produto.id} produto={produto} onPress={onSelecionar} />
        ))
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  secao: { marginBottom: espaco.sm },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm, marginBottom: espaco.md },
  titulo: { fontSize: 20, fontWeight: '800', color: cores.texto },
  contador: {
    minWidth: 26,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: raio.pilula,
    backgroundColor: cores.primariaSuave,
    alignItems: 'center',
  },
  textoContador: { fontSize: 13, fontWeight: '800', color: cores.primaria },
  vazio: {
    fontSize: 15,
    lineHeight: 21,
    color: cores.textoSuave,
    padding: espaco.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: cores.borda,
    borderRadius: raio.md,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
