import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icone: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: '700', color: colors.text },
  detalhes: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  categoria: { fontSize: 11, color: colors.secondary, marginTop: 4, fontWeight: '600', textTransform: 'uppercase' },
  direita: { alignItems: 'flex-end', marginLeft: 8 },
  preco: { fontSize: 14, fontWeight: '800', color: colors.primary },
  status: { marginTop: 6, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  statusTexto: { fontSize: 11, fontWeight: '700', color: colors.white },
});
