import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  valor: { fontSize: 18, fontWeight: '800', color: colors.white, marginTop: 6 },
  legenda: { fontSize: 11, color: colors.textOnDark, marginTop: 2, textAlign: 'center' },
});
