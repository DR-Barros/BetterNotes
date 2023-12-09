import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PDFExample from '../pdf/PDFExample';

const ViewNoteScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Visualización de Nota</Text>
            {/* Aquí puedes mostrar el contenido de la nota */}
            <PDFExample />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewNoteScreen;
