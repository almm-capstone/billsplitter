import React, { Component } from 'react';
const { FirebaseRef } = require('../lib/firebase.js');
import {
  View,
  Text,
  TextInput,
  AlertIOS,
  Button,
  StyleSheet,
  TouchableHighlight,
  Switch,
  ScrollView,
} from 'react-native';

const addBill = (author, body, image, title, items, users) => {
  FirebaseRef.ref('/receipts').push({
    author,
    body,
    image,
    title,
    items,
    users,
  });
};

const addItem = item => {
  db.ref('/receipts/items').set({
    item,
  });
};

class ReceiptForm extends Component {
  state = {
    author: '',
    body: '',
    image: '',
    title: '',
    items: {}, //{ price: “”, name: [], user_claim: “” },
    users: [],
    switchValue: 0,
  };

  handleChangeAuthor = e => {
    this.setState({
      author: e.nativeEvent.text,
    });
  };
  handleChangeBody = e => {
    this.setState({
      body: e.nativeEvent.text,
    });
  };
  handleChangeImage = e => {
    this.setState({
      image: e.nativeEvent.text,
    });
  };
  handleChangeTitle = e => {
    this.setState({
      title: e.nativeEvent.text,
    });
  };
  handleChangeItems = async e => {
    this.setState({
      items: {
        ...this.state.items,
        [e.nativeEvent.target]: e.nativeEvent.text,
      },
    });
  };

  handleChangeUsers = e => {
    this.setState({
      users: e.nativeEvent.text,
    });
  };

  onSwitchChange = () => {
    let count = this.state.switchValue + 1;
    this.setState({
      switchValue: count,
    });
  };

  handleSubmit = () => {
    addBill(
      this.state.author,
      this.state.body,
      this.state.image,
      this.state.title,
      this.state.items,
      this.state.users
    );
    //addItem(this.state.item)
    AlertIOS.alert('Item saved successfully');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>Add Receipt</Text>
          <Text style={styles.title}>Author:</Text>
          <TextInput
            style={styles.itemInput}
            onChange={this.handleChangeAuthor}
          />

          <Text style={styles.title}>Body:</Text>
          <TextInput
            style={styles.itemInput}
            onChange={this.handleChangeBody}
          />

          <Text>image</Text>
          <TextInput
            style={styles.itemInput}
            onChange={this.handleChangeImage}
          />

          <Text>title</Text>
          <TextInput
            style={styles.itemInput}
            onChange={this.handleChangeTitle}
          />

          <Text>item</Text>
          <TextInput
            // target=“item”
            style={styles.itemInput}
            onChange={this.handleChangeItems}
          />

          <Button
            title='add more items'
            color='white'
            value={this.state.switchValue}
            onPress={this.onSwitchChange}
          />

          {this.state.switchValue ? (
            <View key={this.state.switchValue}>
              <Text>{`item${this.state.switchValue}`}</Text>
              <TextInput
                // target={`item${this.state.switchValue}`}
                style={styles.itemInput}
                onChange={this.handleChangeItems}
              />
            </View>
          ) : null}

          <Text>users</Text>
          <TextInput
            style={styles.itemInput}
            onChange={this.handleChangeUsers}
          />

          <TouchableHighlight
            style={styles.button}
            underlayColor='white'
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default ReceiptForm;