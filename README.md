# AutoEstoque

App de gestão de estoque de automóveis feito com React Native e Expo (SDK 54), para o Expo Snack.

## Telas
1. **Cadastro de Usuários**: nome, e-mail, CPF e telefone, com validação dos campos obrigatórios.
2. **Estoque de Veículos**: lista (FlatList) com busca e filtros por categoria e status (Picker).
3. **Lançar Veículo**: cadastro de veículos no estoque (POST).
4. **Dashboard**: resumo dos veículos e usuários cadastrados.

## Estrutura
```
App.js
src/
  navigation/DrawerNavigator.js
  context/AppContext.js
  services/api.js
  utils/index.js
  theme/colors.js
  components/  (CustomDrawer, Input, Button, VehicleCard, StatCard, EmptyState)
  screens/     (Cadastro, Listagem, Lancamento, Dashboard)
```
Cada componente e tela tem sua pasta com `index.js` e `styles.js`.

## API
Os dados usam um vetor local. Para usar uma API na nuvem, crie um projeto no
https://mockapi.io com os recursos `veiculos` e `usuarios` e coloque a URL do projeto
na constante `BASE_URL` do arquivo `src/services/api.js`.

## Dependências
`@react-navigation/native`, `@react-navigation/drawer`, `@react-native-picker/picker`,
`react-native-gesture-handler`, `react-native-reanimated`, `react-native-screens`,
`react-native-safe-area-context`, `@expo/vector-icons`, `expo-status-bar`.
