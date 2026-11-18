import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  detalhes: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  categoria: { fontSize: 12, color: colors.secondary, marginTop: 4 },
  direita: { alignItems: 'flex-end' },
  preco: { fontSize: 14, fontWeight: 'bold', color: colors.primary },
  status: {
    marginTop: 6,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 11,
    color: colors.white,
    overflow: 'hidden',
  },
});
