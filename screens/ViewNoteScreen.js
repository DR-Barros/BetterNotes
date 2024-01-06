import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import PdfViewer from '../components/visualizadores/pdfViewer';
import ImageViewer from '../components/visualizadores/imageViewer';
import VideoViewer from '../components/visualizadores/videoViewer';
import DrawingComponent from '../components/dibujar/drawinComponent';
import colores from '../style/colors';


class ViewNoteScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        folderContent: null,
        source: this.props.route.params.ref,
        type: this.props.route.params.type
      };
      console.log(this.state.type);
      this.imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      this.videoFormats = ['mp4','avi','mov','mkv','wmv','flv',];
  }
    render() {
        return (
            <View style={styles.container}>
              {/* <Button title='volver' onPress={()=>{this.props.navigation.goBack()}} /> */}
              {this.state.type === 'pdf' &&
                <PdfViewer data={this.state.source} goBack={()=>{this.props.navigation.goBack()}} />
              }
              {this.state.type === 'txt' &&
                <Text>{this.state.source}</Text>
              }
              {this.imageFormats.includes(this.state.type) &&
                <ImageViewer data={this.state.source} />
              }
              {this.videoFormats.includes(this.state.type) &&
                <VideoViewer data={this.state.source} />
              }
              
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.verdeMenta
  },
});

export default ViewNoteScreen;
