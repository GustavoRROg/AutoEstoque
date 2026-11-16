import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 16, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: '800', color: colors.primaryDark },
  legenda: { fontSize: 13, color: colors.textMuted, marginTop: 2, marginBottom: 16 },
  linha: { flexDirection: 'row', marginHorizontal: -6 },
  coluna: { flex: 1, marginHorizontal: 6 },
  seletor: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  asterisco: { color: colors.error },
  pickerBox: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 10, overflow: 'hidden' },
  pickerErro: { borderColor: colors.error, borderWidth: 1.5 },
  picker: { color: colors.text, borderWidth: 0, height: 48, paddingHorizontal: 8, backgroundColor: colors.surface },
  erro: { color: colors.error, fontSize: 12, marginTop: 4 },
  botao: { marginTop: 10 },
});
