import React, {Component} from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface ImageViewerProps {
    source: string;
}
interface ImageViewerState {
    source: string;
}

class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {
    constructor(props) {
        super(props);
        this.state = {
            source: props.source
        };
    }
    render() {
        return (
        <View style={styles.container}>
            <Image
            source={{ uri: this.state.source}} // Reemplaza con la URL o ruta local de la imagen
            style={styles.image}
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
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain', // Ajusta el modo de redimensionamiento de la imagen
  },
});

export default ImageViewer;