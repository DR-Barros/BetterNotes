import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const handleViewNote = () => {
        // Navegar a la pantalla de visualización de nota (ViewNoteScreen)
        navigation.navigate('ViewNote');
    };

    return (
        <View style={styles.container}>
            <Text>Lista de Carpetas y Notas</Text>
            {/* Aquí puedes mostrar la lista de carpetas y notas disponibles */}
            <Button title="Ver Nota" onPress={handleViewNote} />
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

export default HomeScreen;
