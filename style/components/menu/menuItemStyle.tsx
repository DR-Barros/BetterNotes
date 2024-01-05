import { StyleSheet } from 'react-native'
const MenuItemStyle = StyleSheet.create({
    container: {
        backgroundColor: '#e0e0e0',
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