import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Produto } from '../types/produto';
import { cores, espaco, raio, sombra } from '../theme';
import { formatarPreco } from '../utils/preco';

type Props = {
  produto: Produto;
  onPress: (id: string) => void;
};

export function ProdutoItem({ produto, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${produto.nome}, ${formatarPreco(produto.preco)}. Abrir detalhes`}
      onPress={() => onPress(produto.id)}
      style={({ pressed }) => [estilos.item, pressed && estilos.pressionado]}
    >
      <View style={estilos.textos}>
        <Text style={estilos.nome} numberOfLines={2}>
          {produto.nome}
        </Text>
        <Text style={estilos.preco}>{formatarPreco(produto.preco)}</Text>
      </View>
      <Text style={estilos.seta}>›</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  item: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    paddingVertical: espaco.md,
    paddingHorizontal: espaco.lg,
    borderRadius: raio.md,
    backgroundColor: cores.superficie,
    marginBottom: espaco.sm,
    ...sombra,
  },
  pressionado: { backgroundColor: cores.primariaSuave },
  textos: { flex: 1, gap: 2 },
  nome: { fontSize: 16, fontWeight: '600', color: cores.texto },
  preco: { fontSize: 15, fontWeight: '700', color: cores.primaria },
  seta: { fontSize: 28, color: cores.textoSuave, lineHeight: 30 },
});
