import { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Button} from 'react-native';
import Pdf from "react-native-pdf";
import colores from "../../style/colors";





interface PdfViewerProps {
    data: string;
    goBack: any;
}
interface PdfViewerState {
    folderContent: any;
    source: any;
    pages: number;
    width: number;
    height: number;
    windowsWidth: number;
    pagesRender: JSX.Element[];
}


class PdfViewer extends Component<PdfViewerProps, PdfViewerState> {
    constructor(props) {
        super(props);
        this.state = {
          folderContent: null,
          source: this.props.data,
          pages: 1,
          width: 1000,
          height: 1000,
          windowsWidth: Dimensions.get('window').width,
          pagesRender: []
        };
        console.log(this.props.data);
    }
    componentDidMount(): void {
        console.log(this.props.data);
        Dimensions.addEventListener('change', this.updateDimensions);
    }
    updateDimensions = ({ window }) => {
        this.setState({ windowsWidth: window.width });
    };
    renderPdfPages = (pages) => {
        let array = Array.from({ length: pages }, (_, index) => (
            <Pdf
                key={index}
                page={index+1}
                source={{uri: this.state.source}}
                style={{
                    width:  Math.floor(this.state.windowsWidth),
                    height: Math.floor(this.state.windowsWidth*this.state.height/this.state.width),
                    marginBottom: 20
                }}
                singlePage={true}
            />
        )); 
        this.setState({ pagesRender: array });
    };
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.superiorBar}>
                <Button title='volver' onPress={()=>{this.props.goBack()}} />
            </View>
            {this.state.pages == 1 ?(
                <Pdf 
                trustAllCerts={false}
                source={{uri: this.state.source}}
                onLoadComplete={(numberOfPages, filePath, {width, height},) => {
                    this.setState({
                        pages: numberOfPages,
                        width: width,
                        height: height
                    })
                    this.renderPdfPages(numberOfPages)
                }}
                onPageChanged={(page, numberOfPages, ) => {
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
            ):(
                <ScrollView style={styles.scroll} centerContent={true} >
                    {this.state.pagesRender}
                </ScrollView>
            )}
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      height: "100%",
    },
    superiorBar: {
        height: 40,
        backgroundColor: colores.principal1,
        width: "100%"
    },
    scroll: {
        width: "100%",
    },
    pdf: {
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        marginBottom: 20
    }
});

export default PdfViewer;