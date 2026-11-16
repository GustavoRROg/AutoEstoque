import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 16, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: colors.primaryDark, marginBottom: 16 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 6, marginTop: 6 },
  picker: { height: 48, backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 10 },
  erro: { color: colors.error, fontSize: 12, marginTop: 4 },
  botoes: { marginTop: 16 },
});
