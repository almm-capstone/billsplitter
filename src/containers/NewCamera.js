import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  FlatList,
  Image,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { Constants, ImagePicker, ImageManipulater, Permissions } from 'expo';
import {
  Button,
  Container,
  Content,
  Card,
  CardItem,
  Col,
  Row,
  Body,
  H3,
  Grid,
  Left,
  List,
  ListItem,
  Text,
  Icon,
  Form,
  Input,
} from 'native-base';
import uuid from 'uuid';
import Environment from '../../config/environment';
import * as firebase from 'firebase';
import { Firebase as firebaseConfig, FirebaseRef } from '../lib/firebase';
import { Actions } from 'react-native-router-flux';
import ReceiptItems from './ListItems';
import { MaterialIcons } from '@expo/vector-icons';
import Spacer from '../../src/native/components/UI/Spacer';

// firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true;

export default class NewCamera extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
    receiptLines: null,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image, receiptLines } = this.state;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.getStartedContainer}>
          {image ? null : (
            <Text style={styles.getStartedText}>
              Pick an image from the gallery or take a photo to get started
            </Text>
          )}
        </View>
        <Spacer size={20} />
        <Container>
          <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Row>
              <Button onPress={this._pickImage}>
                <MaterialIcons name="photo-library" size={40} color="white" />
              </Button>
              <Button onPress={this._takePhoto}>
                <MaterialIcons name="camera-alt" size={40} color="white" />
              </Button>
            </Row>
            {/* {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )} */}
            <Row>{this._maybeRenderImage()}</Row>
            <Row>{this._maybeRenderUploadingOverlay()}</Row>
          </Grid>
        </Container>
      </ScrollView>
    );
  }

  organize = array => {
    return array.map(function(item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, googleResponse, receiptLines } = this.state;
    if (!image) {
      return;
    }

    return (
      <View>
        <Row>
          <Button center onPress={() => this.submitToGoogle()}>
            <Text>Analyze</Text>
          </Button>
        </Row>
        <Row>
          {googleResponse && (
            <Button
              onPress={() => Actions.receiptItems({ items: { receiptLines } })}
            >
              <Text>Edit Receipt</Text>
            </Button>
          )}
        </Row>
        <Row>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </Row>
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = item => {
    <Text>response: {JSON.stringify(item)}</Text>;
  };

  _renderList = () => {
    let { receiptLines } = this.state;
    if (!receiptLines) {
      return;
    }
    return (
      <Text>
        <ReceiptItems items={receiptLines} />
      </Text>
    );
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: 'Check it out',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              // { type: 'LABEL_DETECTION', maxResults: 10 },
              // { type: 'LANDMARK_DETECTION', maxResults: 5 },
              // { type: 'FACE_DETECTION', maxResults: 5 },
              // { type: 'LOGO_DETECTION', maxResults: 5 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              // { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              // { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
              // { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              // { type: 'CROP_HINTS', maxResults: 5 },
              // { type: 'WEB_DETECTION', maxResults: 5 },
            ],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();
      let firstThing = responseJson.responses[0].textAnnotations[0].description.trim();
      console.log('first thing', firstThing);
      this.setState({
        googleResponse: responseJson,
        receiptLines: firstThing,
        uploading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EFF5',
    paddingBottom: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});
