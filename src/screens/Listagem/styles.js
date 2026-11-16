import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  filtros: { padding: 16, paddingBottom: 0 },
  linha: { flexDirection: 'row' },
  coluna: { flex: 1, marginRight: 8 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 6 },
  picker: { height: 48, backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 10 },
  contador: { color: colors.textMuted, marginVertical: 10 },
  lista: { paddingHorizontal: 16, paddingBottom: 24 },
});
