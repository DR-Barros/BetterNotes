import React, {Component} from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

interface ImageViewerProps {
    data: string;
}
interface ImageViewerState {
    source: string;
}

class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {
    constructor(props) {
        super(props);
        this.state = {
            source: props.data
        };
        console.log(this.props.data);
    }
    render() {
        return (
        <View style={styles.container}>
            <Image
            source={{ uri: this.state.source}} // Reemplaza con la URL o ruta local de la imagen
            style={styles.image}
            alt='Imagen de la nota'
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:'100%'
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain', // Ajusta el modo de redimensionamiento de la imagen
  },
});

export default ImageViewer;