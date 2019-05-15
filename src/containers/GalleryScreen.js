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
// import ocrSpaceApi from '../../node_modules/ocr-space-api';

// var options = {
//   apikey: 'a4a2755bb988957',
//   language: 'eng', // Português
//   imageFormat: 'image/jpg', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
//   url: 'https://api.ocr.space/parse/image',
//   isOverlayRequired: true,
// };

// Image file to upload
// const imageFilePath = 'imageFile.jpg';

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
    height: null,
    width: null,
    visionResp: [],
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = uri => {
    let selected = this.state.selected;
    if (selected !== uri) {
      selected = uri;
    } else {
      selected = null;
    }
    this.setState({ selected: selected });
    // console.log('state', this.state);
  };

  getSize = () => {
    let photo = this.state.selected;
    Image.getSize(photo, (width, height) => {
      this.setState({ width: width, height: height });
    });
  };

  deletePicture = async () => {
    let selected = this.state.selected;
    let fileName = selected.slice(PHOTOS_DIR.length + 1);
    let filteredPhotos = this.state.photos.filter(photo => photo !== fileName);
    this.setState({ photos: filteredPhotos });
    await FileSystem.deleteAsync(selected);
  };

  getPicture = async () => {
    const photo = [this.state.selected];
    this.setState({ image: photo });
    this.getSize(photo);
    this.detectText(photo);
  };

  // parsePhoto = async () => {
  //   await ocrSpaceApi
  //     .parseImageFromLocalFile(this.state.selected, options)
  //     .then(function(parsedResult) {
  //       console.log('parsedText: \n', parsedResult.parsedText);
  //       console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
  //     })
  //     .catch(function(err) {
  //       console.log('ERROR:', err);
  //     });
  // };

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
            <MaterialIcons name="library-add" size={25} color="white" />
            {/* <Text style={styles.whiteText}>Add New Bill</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.deletePhoto}>
            <MaterialIcons name="delete" size={25} color="white" />
          </TouchableOpacity>
          {this.state.image ? (
            <ImageBackground
              source={{ uri: this.state.selected }}
              style={styles.imageBackground}
              key="image"
              resizeMode="cover"
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.setState({
                    image: null,
                    selected: null,
                  })
                }
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
    backgroundColor: '#008e97',
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

// detectText = async (uri, imageProperties) => {
//   const photo = this.state.selected;
//   if (photo.length > 0) {
//     const visionResp = await RNTextDetector.detectFromUri(photo);
//     console.log('vision resp', visionResp);
//     if (!(visionResp && visionResp.length > 0)) {
//       throw 'Unmatched';
//     }
//     this.setState(
//       {
//         visionResp: this.mapVisionRespToScreen(visionResp, photo),
//       },
//       // () => console.log('state', this.state),
//     );
//   }
// };

// mapVisionRespToScreen = (visionResp, photo) => {
//   const IMAGE_TO_SCREEN_Y = deviceHeight / this.state.height;
//   const IMAGE_TO_SCREEN_X = deviceWidth / this.state.width;

//   return visionResp.map(item => {
//     return {
//       ...item,
//       position: {
//         width: item.bounding.width * IMAGE_TO_SCREEN_X,
//         left: item.bounding.left * IMAGE_TO_SCREEN_X,
//         height: item.bounding.height * IMAGE_TO_SCREEN_Y,
//         top: item.bounding.top * IMAGE_TO_SCREEN_Y,
//       },
//     };
//   });
// };
