import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { cores, espaco, raio } from '../theme';

type Props = {
  titulo: string;
  onPress: () => void;
  desabilitado?: boolean;
  variante?: 'primario' | 'secundario' | 'alerta';
};

export function Botao({ titulo, onPress, desabilitado = false, variante = 'primario' }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: desabilitado }}
      disabled={desabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.base,
        estilos[variante],
        desabilitado && estilos.desabilitado,
        pressed && !desabilitado && estilos.pressionado,
      ]}
    >
      <Text style={[estilos.texto, estilosTexto[variante]]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: raio.md,
    paddingHorizontal: espaco.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  primario: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  secundario: { backgroundColor: cores.superficie, borderColor: cores.primaria },
  alerta: { backgroundColor: cores.superficie, borderColor: cores.erro },
  desabilitado: { opacity: 0.4 },
  pressionado: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  texto: { fontSize: 16, fontWeight: '700' },
});

const estilosTexto = StyleSheet.create({
  primario: { color: '#FFFFFF' },
  secundario: { color: cores.primaria },
  alerta: { color: cores.erro },
});
