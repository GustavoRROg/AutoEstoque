import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 6 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  inputErro: { borderColor: colors.error },
  erro: { color: colors.error, fontSize: 12, marginTop: 4 },
});
