import { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Button} from 'react-native';
import Pdf from "react-native-pdf";
import colores from "../../style/colors";
import DrawingComponent from "../dibujar/drawinComponent";





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
    pagesRender: any;
    color: string;
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
          pagesRender: [],
          color: "#000000",
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
    componentDidUpdate(prevState: Readonly<PdfViewerState>): void {
        if (prevState.color !== this.state.color) {
            console.log(this.state.color);
        }
    }
    
    renderPdfPages = (pages) => {
        let numeros = Array.from({ length: pages }, (_, index) => index + 1);
        this.setState({ pagesRender: numeros });
    };
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.superiorBar}>
                <Button title='volver' onPress={()=>{this.props.goBack()}} />
                <Button title='rojo' onPress={()=>{this.setState({color: "#FF0000"})}} />
                <Button title='verde' onPress={()=>{this.setState({color: "#00FF00"})}} />
                <Button title='azul' onPress={()=>{this.setState({color: "#0000FF"})}} />
                <Button title='negro' onPress={()=>{this.setState({color: "#000000"})}} />

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
                    {this.state.pagesRender.map((item, index) => (
                        <View key={index} >
                            <DrawingComponent 
                                color={this.state.color}
                                style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    top: 0,
                                    bottom: 40,
                                    left: 40,
                                    right: 40,
                                }} 
                            />
                            <Pdf
                                key={index}
                                page={index+1}
                                source={{uri: this.state.source}}
                                style={{
                                    width: this.state.windowsWidth-40,
                                    height: Math.floor((this.state.windowsWidth-40)*this.state.height/this.state.width),
                                    marginBottom: 20,
                                    marginLeft:20,
                                    marginRight:20,
                                }}
                                singlePage={true}
                            />
                        </View>
                    ))}
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
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
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