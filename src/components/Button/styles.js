import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  primario: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginVertical: 6,
  },
  secundario: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginVertical: 6,
  },
  texto: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  textoSecundario: { color: colors.primary, fontSize: 16, fontWeight: 'bold' },
});
