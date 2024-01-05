import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

interface ImportButtonInterface {
    folder: string;
}
interface ImportButtonState {
    folder: string;
}

/**
 * Componente que renderiza un boton que al pincharlo abre un explorador de archivos
 */
class ImportButton extends Component<ImportButtonInterface, ImportButtonState> {
    constructor(props: ImportButtonInterface) {
        super(props);
        this.state = {
            folder: this.props.folder
        };
        this.onPress = this.onPress.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }
    /**
     * Funcion que se ejecuta al pinchar el boton
     */
    async onPress() {
        
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        console.log(
            res
        );
        // Si deseas guardar el archivo
        this.saveFile(res);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // Selección de archivo cancelada
        } else {
          // Manejar otros errores
          console.error('Error al seleccionar el archivo:', err);
        }
      }
    }
    async saveFile(file: any) {
        let archivo = file[0];
        const uri = archivo.uri;
        const name = archivo.name;
        const newPath = `${FileSystem.documentDirectory}${this.state.folder}/${name}`;
        console.log(newPath);
        console.log(file[0]);
        try {
            await FileSystem.copyAsync({
                from: uri,
                to: newPath,
            });
            console.log('Archivo guardado exitosamente en:', newPath);
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }

    }
    componentDidUpdate(prevProps: Readonly<ImportButtonInterface>, prevState: Readonly<ImportButtonState>, snapshot?: any): void {
        if (prevProps.folder !== this.props.folder) {
            this.setState({ folder: this.props.folder });
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
                <Text style={styles.text} >Importar</Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    button : {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
    },
    text: {
        color: '#000',
        fontSize: 20,
    }
};

export default ImportButton;
