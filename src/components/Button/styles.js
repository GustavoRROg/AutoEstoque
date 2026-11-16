import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  base: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  primario: { backgroundColor: colors.primary },
  secundario: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
  destaque: { backgroundColor: colors.accent },
  inativo: { opacity: 0.5 },
  texto: { fontSize: 16, fontWeight: '700' },
  texto_primario: { color: colors.white },
  texto_secundario: { color: colors.primary },
  texto_destaque: { color: colors.primaryDark },
});
