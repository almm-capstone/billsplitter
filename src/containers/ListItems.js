import React, { Component } from 'react';
const { FirebaseRef } = require('../lib/firebase.js');
import {
  View,
  Text,
  TextInput,
  FlatList,
  AlertIOS,
  Button,
  StyleSheet,
  TouchableHighlight,
  Switch,
  ScrollView,
} from 'react-native';

export default class ReceiptItems extends Component {
  render() {
    let { items } = this.props;
    console.log('props', items.receiptLines);
    let receipt = items.receiptLines.split('\n');
    console.log(receipt);

    return (
      <View>
        {receipt.map(elem => {
          <TextInput>elem</TextInput>;
        })}
      </View>
    );
  }
}
