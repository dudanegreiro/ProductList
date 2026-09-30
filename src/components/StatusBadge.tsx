import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco, raio } from '../theme';

/** Situação escrita + forma do marcador (cheio/vazio): não depende só de cor. */
export function StatusBadge({ ativo }: { ativo: boolean }) {
  return (
    <View
      accessible
      accessibilityLabel={`Situação: ${ativo ? 'Ativo' : 'Inativo'}`}
      style={[estilos.base, ativo ? estilos.ativo : estilos.inativo]}
    >
      <View style={[estilos.marcador, ativo ? estilos.marcadorAtivo : estilos.marcadorInativo]} />
      <Text style={[estilos.texto, ativo ? estilos.textoAtivo : estilos.textoInativo]}>
        {ativo ? 'Ativo' : 'Inativo'}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: espaco.sm,
    paddingVertical: 6,
    paddingHorizontal: espaco.md,
    borderRadius: raio.pilula,
  },
  ativo: { backgroundColor: cores.primariaSuave },
  inativo: { backgroundColor: cores.inativoSuave },
  marcador: { width: 10, height: 10, borderRadius: 5 },
  marcadorAtivo: { backgroundColor: cores.primaria },
  marcadorInativo: { borderWidth: 2, borderColor: cores.inativo },
  texto: { fontSize: 14, fontWeight: '700' },
  textoAtivo: { color: cores.primaria },
  textoInativo: { color: cores.inativo },
});
