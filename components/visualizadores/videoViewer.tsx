import React, {Component, useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

interface VideoPlayerProps {
  data: string;
}
interface VideoPlayerState {
    folderContent: any;
    source: any;
    isVideoReady: boolean;
}

class VideoPlayer extends Component<VideoPlayerProps, VideoPlayerState> {
    constructor(props) {
        super(props);
        this.state = {
            folderContent: null,
            source: { uri: this.props.data, cache: true },
            isVideoReady: false,
        };
        this.videoRef = null;
    }
    componentDidMount(): void {
        if (this.videoRef) {
            this.videoRef.presentFullscreenPlayer();
        }
    }
    handleVideoLoad = () => {
        this.setState({ isVideoReady: true });
    };
  render() {
    return (
      <View style={styles.container}>
        <Video
            source={this.state.source}
            controls={true}
            ref={this.videoRef}
            style={styles.video}
            onError={error => {
                console.log(error);
            }}
            resizeMode="contain"
            onLoad={this.handleVideoLoad} // Llama a la función cuando el video se carga

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
  video: {
    width: '100%',
    height: 300,
  },
});

export default VideoPlayer;
