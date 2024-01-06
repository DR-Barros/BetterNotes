import React, { Component, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PanResponder } from 'react-native';
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
        /* this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                console.log('onStartShouldSetPanResponder');
                return true;
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                console.log('onStartShouldSetPanResponderCapture');
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                console.log('onMoveShouldSetPanResponder');
                return true;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                console.log('onMoveShouldSetPanResponderCapture');
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
                console.log('onPanResponderGrant');
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log('onPanResponderMove', evt.nativeEvent.identifier);
                return true;
            },
            onPanResponderTerminationRequest: (evt, gestureState) => {
                console.log('onPanResponderTerminationRequest');
                return true;
            },
            onPanResponderRelease: (evt, gestureState) => {
                console.log('onPanResponderRelease');
                return true;
            },
            onPanResponderTerminate: (evt, gestureState) => {
                console.log('onPanResponderTerminate');
                return true;
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                console.log('onShouldBlockNativeResponder');
                return true;
            },
        }); */
    }
    clearCanvas = () => {
        this.canvasRef.current.clear();
    };
    undoCanvas(){
        this.canvasRef.current.undo();
    }
    render() {
        return (
            <View /* {...this.panResponder.panHandlers} */ style={styles.container}>
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