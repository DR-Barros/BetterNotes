import React, { Component, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PanResponder } from 'react-native';
import { SketchCanvas } from "@kichiyaki/react-native-sketch-canvas";


class DrawingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
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
    componentDidUpdate(prevProps: Readonly<{}>): void {
        if (prevProps.color !== this.props.color) {
            this.setState({ color: this.props.color });
            console.log('color cambiado');
        }
    }

    render() {
        return (
            <SketchCanvas
                ref={this.canvasRef}
                style={this.props.style}
                strokeColor={this.state.color}
                strokeWidth={this.state.lineWidth}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        
    }
});

export default DrawingComponent;