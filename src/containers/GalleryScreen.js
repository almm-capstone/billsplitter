import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import RNTextDetector from 'react-native-text-detector';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    selected: null,
    image: null,
    visionResp: [],
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = uri => {
    let selected = this.state.selected;
    console.log('uri', uri);
    if (selected !== uri) {
      selected = uri;
    } else {
      selected = null;
    }
    this.setState({ selected: selected }, () =>
      console.log('old state', this.state),
    );
    // console.log('state', this.state);
  };

  getPicture = async () => {
    const photo = [this.state.selected];
    this.setState({ image: photo });
    this.detectText(photo);

    // if (photo.length > 0) {
    //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //   if (status !== 'granted') {
    //     throw new Error('Denied CAMERA_ROLL permissions!');
    //   }

    //   const promises = photo.map(photoUri => {
    //     return MediaLibrary.createAssetAsync(photoUri);
    //   });

    //   await Promise.all(promises);
    //   alert("Successfully saved photos to user's gallery!");
    // } else {
    //   alert('No photos to save!');
    // }
  };

  detectText = async (uri, imageProperties) => {
    const photo = this.state.selected;
    if (photo.length > 0) {
      const visionResp = await RNTextDetector.detectFromUri(photo);
      // console.log('image props', imageProperties);
      if (!(visionResp && visionResp.length > 0)) {
        throw 'Unmatched';
      }
      this.setState(
        {
          visionResp: this.mapVisionRespToScreen(visionResp, photo),
        },
        // () => console.log('state', this.state),
      );
    }
  };

  mapVisionRespToScreen = (visionResp, photo) => {
    const IMAGE_TO_SCREEN_Y = 1 / 3;
    const IMAGE_TO_SCREEN_X = 1 / 3;
    console.log('device height', deviceHeight);
    console.log('device width', deviceWidth);

    return visionResp.map(item => {
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y,
        },
      };
    });
  };

  renderPhoto = fileName => (
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.getPicture}>
            <Text style={styles.whiteText}>Save selected to gallery</Text>
          </TouchableOpacity>
          {this.state.image ? (
            <ImageBackground
              source={{ uri: this.state.selected }}
              style={styles.imageBackground}
              key="image"
              resizeMode="contain"
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.setState({ image: null })}
              >
                <MaterialIcons name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
              {this.state.visionResp.map(item => {
                // console.log('an item', item);
                return (
                  <TouchableOpacity
                    style={[styles.boundingRect, item.position]}
                    key={item.text}
                  />
                );
              })}
            </ImageBackground>
          ) : null}
        </View>
        {!this.state.image ? (
          <ScrollView contentComponentStyle={{ flex: 1 }}>
            <View style={styles.pictures}>
              {this.state.photos.map(this.renderPhoto)}
            </View>
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
  },
  imageBackground: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    top: 0,
    left: 0,
  },
  boundingRect: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF6600',
  },
});
