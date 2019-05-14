var environments = {
  staging: {
    FIREBASE_API_KEY: 'AIzaSyBwmylr4mJRaFpv12kF2DI-yQQhqT0dtcw',
    FIREBASE_AUTH_DOMAIN: 'almm-capstone.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://almm-capstone.firebaseio.com',
    FIREBASE_PROJECT_ID: 'almm-capstone',
    FIREBASE_STORAGE_BUCKET: 'almm-capstone.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '997357993032',
    GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyBsYkQ6shWmbb--KeMXIOYHM-OmHanXxOU',
  },
  production: {
    // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  },
};
function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return 'staging';
  } else if (releaseChannel === 'staging') {
    return 'staging';
  } else {
    return 'staging';
  }
}
function getEnvironment(env) {
  console.log('Release Channel: ', getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
