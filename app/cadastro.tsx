import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Botao } from '../src/components/Botao';
import { CampoTexto } from '../src/components/CampoTexto';
import { StatusBadge } from '../src/components/StatusBadge';
import { useProdutos } from '../src/context/ProdutosContext';
import { cores, espaco, raio, sombra } from '../src/theme';
import { validarPreco } from '../src/utils/preco';

export default function TelaCadastro() {
  const router = useRouter();
  const { adicionarProduto } = useProdutos();

  // Valores em edição ficam no estado local do formulário.
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [nomeTocado, setNomeTocado] = useState(false);
  const [precoTocado, setPrecoTocado] = useState(false);

  // Validação derivada dos valores atuais.
  const nomeValido = nome.trim().length > 0;
  const resultadoPreco = validarPreco(preco);
  const podeCadastrar = nomeValido && resultadoPreco.valido;

  const erroNome = nomeTocado && !nomeValido ? 'O nome deve ter pelo menos um caractere.' : null;
  const erroPreco = precoTocado && !resultadoPreco.valido ? resultadoPreco.erro : null;

  function cadastrar() {
    if (!nomeValido || !resultadoPreco.valido) {
      setNomeTocado(true);
      setPrecoTocado(true);
      return;
    }
    adicionarProduto({ nome: nome.trim(), preco: resultadoPreco.valor, ativo });
    setNome('');
    setPreco('');
    setAtivo(true);
    setNomeTocado(false);
    setPrecoTocado(false);
    router.dismissTo('/');
  }

  return (
    <SafeAreaView style={estilos.tela} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={estilos.tela}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
          <View style={estilos.cartao}>
            <CampoTexto
              rotulo="Nome do produto"
              value={nome}
              onChangeText={(t) => {
                setNome(t);
                setNomeTocado(true);
              }}
              onBlur={() => setNomeTocado(true)}
              placeholder="Ex.: Arroz 1 kg"
              erro={erroNome}
            />
            <CampoTexto
              rotulo="Preço (R$)"
              value={preco}
              onChangeText={(t) => {
                setPreco(t);
                setPrecoTocado(true);
              }}
              onBlur={() => setPrecoTocado(true)}
              placeholder="Ex.: 12,50"
              keyboardType="numbers-and-punctuation"
              erro={erroPreco}
            />

            <View style={estilos.linhaSituacao}>
              <View style={estilos.textoSituacao}>
                <Text style={estilos.rotulo}>Situação</Text>
                <StatusBadge ativo={ativo} />
              </View>
              <Switch
                accessibilityLabel="Produto ativo"
                value={ativo}
                onValueChange={setAtivo}
                trackColor={{ false: cores.trilhaSwitch, true: cores.primaria }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <Botao titulo="Cadastrar produto" onPress={cadastrar} desabilitado={!podeCadastrar} />
          {!podeCadastrar ? (
            <Text style={estilos.dica}>
              Preencha um nome e um preço válidos para liberar o cadastro.
            </Text>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espaco.lg, gap: espaco.md },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.lg,
    padding: espaco.lg,
    ...sombra,
  },
  linhaSituacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espaco.md,
  },
  textoSituacao: { flex: 1, gap: 6 },
  rotulo: { fontSize: 15, fontWeight: '700', color: cores.texto },
  dica: { fontSize: 14, color: cores.textoSuave, textAlign: 'center' },
});
