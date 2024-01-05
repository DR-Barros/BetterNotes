import { Component } from "react";
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import Pdf from "react-native-pdf";





interface PdfViewerProps {
    data: string;
}
interface PdfViewerState {
    folderContent: any;
    source: any;
}


class PdfViewer extends Component<PdfViewerProps, PdfViewerState> {
    constructor(props) {
        super(props);
        this.state = {
          folderContent: null,
          source: { uri: this.props.data, cache: true },
        };
        console.log(this.props.data);
    }
    componentDidMount(): void {
        console.log(this.props.data);
    }
      render() {
          return (
              <View style={styles.container}>
                <Pdf 
                    trustAllCerts={false}
                    source={this.state.source}
                    onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                    }}
                    onError={error => {
                    console.log(error);
                    }}
                    onPressLink={uri => {
                    console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
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
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default PdfViewer;