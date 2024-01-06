import React, { Component, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SketchCanvas } from "@kichiyaki/react-native-sketch-canvas";


class DrawingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#000000',
            lineWidth: 5,
            canvasStyle: {
                backgroundColor: '#ffffff',
                flex: 1,
            },
        };
        this.canvasRef = React.createRef();
    }
    clearCanvas = () => {
        this.canvasRef.current.clear();
    };
    undoCanvas(){
        this.canvasRef.current.undo();
    }
    render() {
        return (
            <View style={styles.container}>
                <SketchCanvas
                    ref={this.canvasRef}
                    style={{ flex: 1 }}
                    strokeColor={"red"}
                    strokeWidth={7}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={this.clearCanvas}>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.undoCanvas}>
                        <Text>Undo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        zIndex: 1
    }
});

export default DrawingComponent;