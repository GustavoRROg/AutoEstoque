# AutoEstoque: AOP-02 Desenvolvimento Mobile

App de **gestão de estoque de automóveis** em React Native/Expo, com exatamente 4 telas.

## Estrutura
```
App.js                          -> Provider do contexto + NavigationContainer
src/
  navigation/DrawerNavigator.js -> Drawer Navigator + lista de rotas
  context/AppContext.js         -> createContext / useContext (usuários e veículos)
  services/api.js               -> GET/POST (mockapi.io) com fallback para vetor local
  utils/validacoes.js           -> máscaras e validações (CPF, e-mail, telefone, placa)
  utils/formatadores.js         -> moeda, quilometragem e placa
  utils/alerta.js               -> alerta compatível com web/Android/iOS
  theme/colors.js               -> paleta de cores
  components/<Nome>/index.js + styles.js
    CustomDrawer, Input, Button, VehicleCard, StatCard, BarraCategoria, EmptyState
  screens/<Nome>/index.js + styles.js
    Cadastro   (Tela 1: cadastro de usuários: Nome, E-mail, CPF, Telefone)
    Listagem   (Tela 2: estoque em FlatList + filtros: busca, categoria, status, ordenação)
    Lancamento (Tela 3: lançamento de veículo via POST)
    Dashboard  (Tela 4: indicadores do estoque, gráficos por categoria/status)
```

## Requisitos atendidos
- **Drawer customizado** com badges, cadeado em rota protegida e `try/catch` na navegação;
  `onUnhandledAction` no NavigationContainer evita quebra em rotas inválidas.
- **Context API** (`createContext`, `useContext` via hook `useApp`).
- **Desestruturação** nas props (comunicação direta) e no contexto (indireta).
- **Validação**: campos obrigatórios, e-mail, CPF (dígitos verificadores), telefone, placa
  (padrão antigo e Mercosul), ano, preço; CPF e placa duplicados são recusados.
- **API REST**: GET e POST. Para usar a nuvem, crie em https://mockapi.io os recursos
  `usuarios` e `veiculos` e cole a URL em `BASE_URL` (`src/services/api.js`).

## Como montar no Expo Snack
No Snack, crie os arquivos com o caminho completo no nome (ex.: `src/screens/Cadastro/index.js`)
ou importe o projeto de um repositório GitHub. O Snack roda o Expo SDK 54 (o projeto já está nessa versão). Use o arquivo `AutoEstoque_Snack.html` da entrega para abrir tudo no Snack com um clique. Quando o Snack pedir para adicionar as dependências,
aceite: `@react-navigation/native`, `@react-navigation/drawer`, `react-native-gesture-handler`,
`react-native-reanimated`, `react-native-screens`, `react-native-safe-area-context`,
`@react-native-picker/picker`, `@expo/vector-icons`.
