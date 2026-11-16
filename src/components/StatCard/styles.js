import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    margin: 4,
    alignItems: 'center',
  },
  valor: { fontSize: 18, fontWeight: 'bold', color: colors.accent },
  legenda: { fontSize: 12, color: colors.white, marginTop: 4, textAlign: 'center' },
});
