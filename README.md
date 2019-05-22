<img src="/src/images/app-icon.png" alt="Tabs Billsplitter" width="300" />


---

# Tabs Billsplitter

#### Tabs Billsplitter is a mobile app for friends to split the check and pay each other back after eating out. Tabs uses text recognition technology and a custom algorithm to process information about a check, calculate tax and tip, and determine what everyone owes.

---

## 👋 Intro

Tabs bill-splitting app was built with React Native and Redux on the front end, and uses Expo to build native iOS and android apps simultaneously. We used Firebase's Realtime Database to store and update receipt information in real time. To continue using Expo, we decided to handle the OCR (Optical Character Recognition) outside of the platform and used Google Cloud Vision to fetch data from receipts. Tabs was styled with Native-Base.

### Dependencies
- __Flux architecture__
    - [Redux](https://redux.js.org/docs/introduction/)
- __Routing and navigation__
    - [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) for native mobile
- __Data Caching / Offline__
    - [Redux Persist](https://github.com/rt2zz/redux-persist)
- __UI Toolkit/s__
    - [Native Base](https://nativebase.io/) for native mobile
- __Simpler mobile app development__ through
    - [Expo](https://expo.io/)
- __User authentication__ example through
    - [Firebase](https://firebase.google.com/)
- __Text recognition technology through__
    - [Google Vision AI](https://cloud.google.com/vision/)
    - [Cloud Vision Text Detection](https://cloud.google.com/vision/docs/ocr)

---

## 📖 Docs

- [Setup your own Firebase](/docs/firebase.md)
- [Understanding the file structure](/docs/file-structure.md)
- [FAQs & Opinions](/docs/faqs.md)

---

## 🚀 Getting Started

#### 1. Clone and Install

_*It's recommended that you install [React Native Debugger](https://github.com/jhen0409/react-native-debugger/releases) and open before `npm start`._

```bash
# Clone the repo
git clone https://github.com/almm-capstone/billsplitter

# Install dependencies
npm install
```

#### 2. Run the _Tabs_ App

```bash
# Start the React Native packager
npm start
```

Instructions are shown in the terminal. You can select to open it in:

- An emulator (either iOS or Android)
- Your mobile device with the [Expo app](https://expo.io/). It will reload if you save edits to your files and you will see build errors and logs in the terminal.

##### 3. Team

_Ashley Heestand_  

_Matt Hemmerly_  

_Meng Mu_  

_Lesley Smith_  


###### 4. Patches and Pull Requests

Your patches are welcome. Here's our suggested workflow:
 
* Fork the project.
* Make your feature addition or bug fix.
* Send us a pull request with a description of your work. Bonus points for topic branches!

## Copyright and attribution

Copyright (c) 2016 DataMade. Released under the [MIT License](https://github.com/almm-capstone/billsplitter/blob/master/LICENSE).


