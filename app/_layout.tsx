import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ProdutosProvider } from '../src/context/ProdutosContext';
import { cores } from '../src/theme';

export default function RootLayout() {
  return (
    <ProdutosProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.primaria },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Meus produtos' }} />
        <Stack.Screen name="cadastro" options={{ title: 'Cadastrar produto' }} />
        <Stack.Screen name="produtos/[id]" options={{ title: 'Detalhes do produto' }} />
      </Stack>
    </ProdutosProvider>
  );
}
