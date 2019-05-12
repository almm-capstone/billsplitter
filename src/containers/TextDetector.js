// import React, { Componenent } from 'react';
// import RNTextDetector from 'react-native-text-detector';

// import Photo from './Photo';
// import GalleryScreen from './GalleryScreen';

// export default class TextDetector extends React.Component {
//   state = {
//     loading: false,
//     image: null,
//     error: null,
//     visionResp: [],
//   };
//   reset(error = 'OTHER') {
//     this.setState(
//       {
//         loading: false,
//         image: null,
//         error,
//       },
//       () => {
//         setTimeout(() => this.camera.startPreview(), 500);
//       },
//     );
//   }

//   processImage = async (uri, imageProperties) => {};
// }

// const styles = StyleSheet.create({
//   screen: {
//     backgroundColor: 'black',
//     flex: 1,
//   },
//   camera: {
//     position: 'absolute',
//     width: deviceWidth,
//     height: deviceHeight,
//     alignItems: 'center',
//     justifyContent: 'center',
//     top: 0,
//     left: 0,
//     flex: 1,
//   },
//   imageBackground: {
//     position: 'absolute',
//     width: deviceWidth,
//     height: deviceHeight,
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     top: 0,
//     left: 0,
//   },
//   buttonContainer: {
//     width: 70,
//     height: 70,
//     backgroundColor: 'white',
//     borderRadius: 35,
//     position: 'absolute',
//     bottom: 36,
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     width: 64,
//     height: 64,
//     backgroundColor: 'white',
//     borderRadius: 32,
//     borderWidth: 4,
//     borderColor: 'black',
//   },
//   boundingRect: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#FF6600',
//   },
// });
