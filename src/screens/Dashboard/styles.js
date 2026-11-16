import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 12 },
  linha: { flexDirection: 'row' },
  cartao: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    margin: 4,
    marginTop: 10,
  },
  cartaoTitulo: { fontSize: 16, fontWeight: 'bold', color: colors.primaryDark, marginBottom: 8 },
  destaque: { fontSize: 22, fontWeight: 'bold', color: colors.primary },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemTexto: { fontSize: 15, color: colors.text },
  itemValor: { fontSize: 15, fontWeight: 'bold', color: colors.primary },
  usuario: { paddingVertical: 6 },
  vazio: { fontSize: 13, color: colors.textMuted, marginBottom: 6 },
});
