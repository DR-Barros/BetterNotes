import { StyleSheet } from 'react-native'
import colores from '../../colors';
const MenuItemStyle = StyleSheet.create({
    container: {
        backgroundColor: colores.grisClaro,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        width: 120,
        height: 100,
      },
      folderName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      notesCount: {
        color: 'gray',
      },
})

export default MenuItemStyle;