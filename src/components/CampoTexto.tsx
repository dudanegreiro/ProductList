import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { cores, espaco, raio } from '../theme';

type Props = TextInputProps & {
  rotulo: string;
  erro?: string | null;
};

export function CampoTexto({ rotulo, erro, style, onFocus, onBlur, ...resto }: Props) {
  const [focado, setFocado] = useState(false);

  return (
    <View style={estilos.grupo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        accessibilityLabel={rotulo}
        placeholderTextColor="#7D8C86"
        style={[
          estilos.input,
          focado && estilos.inputFocado,
          erro ? estilos.inputErro : null,
          style,
        ]}
        onFocus={(e) => {
          setFocado(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocado(false);
          onBlur?.(e);
        }}
        {...resto}
      />
      {erro ? (
        <Text accessibilityLiveRegion="polite" style={estilos.erro}>
          {erro}
        </Text>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  grupo: { marginBottom: espaco.lg },
  rotulo: { fontSize: 15, fontWeight: '700', color: cores.texto, marginBottom: 6 },
  input: {
    minHeight: 52,
    borderWidth: 2,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: espaco.md,
    fontSize: 16,
    backgroundColor: cores.superficie,
    color: cores.texto,
  },
  inputFocado: { borderColor: cores.primaria },
  inputErro: { borderColor: cores.erro, backgroundColor: cores.erroSuave },
  erro: { color: cores.erro, fontSize: 14, marginTop: 6, fontWeight: '600' },
});
