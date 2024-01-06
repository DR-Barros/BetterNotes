import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import Video from 'react-native-video';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colores from '../../style/colors';


interface VideoPlayerProps {
  data: string;
}
interface VideoPlayerState {
    source: {
      uri: string
    };
    paused: boolean;
    currentTime: number;
    duration: number;
}

class VideoPlayer extends Component<VideoPlayerProps, VideoPlayerState> {
    constructor(props) {
        super(props);
        this.state = {
            source: { uri: this.props.data},
            paused: true,
            currentTime: 0,
            duration: 0,
        };
    }
    componentDidMount(): void {
      console.log(this.state.source)
    }
    handlePlayPause = () => {
      this.setState((prevState) => ({ paused: !prevState.paused }));
    };
  
    handleProgressChange = (value) => {
      const { duration } = this.state;
      this.setState({ currentTime: value * duration });
    };
  
    handleLoad = (data) => {
      this.setState({ duration: data.duration });
    };
  
    handleEnd = () => {
      this.setState({ paused: true, currentTime: 0 });
    };
    render() {
      return (
        <View style={styles.container}>
          <Video
              source={this.state.source}
              controls={false}
              style={styles.video}
              resizeMode="contain"
              paused={this.state.paused}
              onProgress={(data) => this.setState({ currentTime: data.currentTime })}
              onLoad={this.handleLoad}
              onEnd={this.handleEnd}
          />
          <View style={styles.controlerContainer}>
              <TouchableOpacity onPress={()=>{this.setState((prevState)=>({paused: !prevState.paused}))}}>
                { this.state.paused ? (
                  <FontAwesomeIcon name="play" size={30} color={colores.verdeMenta} />
                ):(
                  <FontAwesomeIcon name="pause" size={30} color={colores.verdeMenta} />
                )}
              </TouchableOpacity>
              {/* <Slider
                style={styles.slider}
                value={currentTime / duration}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={this.handleProgressChange}
              /> */}
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  video: {
    width: '100%',
    height: '90%',
    backgroundColor: "black"
  },
  controlerContainer: {
    width: '100%',
    height: '10%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colores.grisOscuro,
  },
});

export default VideoPlayer;
