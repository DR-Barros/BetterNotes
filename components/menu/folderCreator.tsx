import React, { Component } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface CreateFolderInterface {
  folder: string;
}

interface CreateFolderState {
  folderName: string;
  actualFolder: any;
}

class FolderCreator extends Component<CreateFolderInterface, CreateFolderState> {
  constructor(props: CreateFolderInterface) {
    super(props);
    this.state = {
      folderName: '',
      actualFolder: this.props.folder,
    };
  }

  createFolder = async () => {
    const { folderName } = this.state;
    if (folderName.trim() === '') {
      Alert.alert('Por favor, introduce un nombre para la carpeta');
      return;
    }

    try {
      // Ruta donde deseas crear la carpeta (puedes cambiar esto según tus necesidades)
      const folderPath = `${FileSystem.documentDirectory}${this.state.actualFolder}/${folderName}`;

      // Verificar si la carpeta ya existe
      const folderExists = await FileSystem.getInfoAsync(folderPath);
      if (folderExists.exists) {
        Alert.alert('La carpeta ya existe');
        return;
      }

      // Crear la carpeta
      await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
      Alert.alert('Carpeta creada exitosamente');
      this.setState({ folderName: '' }); // Limpiar el campo de nombre
    } catch (error) {
      console.error('Error al crear la carpeta:', error);
      Alert.alert('Error al crear la carpeta');
    }
  };

  componentDidUpdate(prevProps: Readonly<CreateFolderInterface>, prevState: Readonly<CreateFolderState>, snapshot?: any): void {
    if (prevProps.folder !== this.props.folder) {
      this.setState({ actualFolder: this.props.folder });
    }
  }

  render() {
    return (
      <View>
        <TextInput
          value={this.state.folderName}
          onChangeText={(text) => this.setState({ folderName: text })}
          placeholder="Nombre de la carpeta"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <Button title="Crear Carpeta" onPress={this.createFolder} />
      </View>
    );
  }
}

export default FolderCreator;