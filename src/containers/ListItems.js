import React, { Component } from 'react';
const { FirebaseRef } = require('../lib/firebase.js');
import {
  View,
  Button,
  TextInput,
  FlatList,
  AlertIOS,
  StyleSheet,
  TouchableHighlight,
  Switch,
  ScrollView,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  H3,
  List,
  ListItem,
  Text,
  Icon,
  Form,
  Input,
} from 'native-base';
import { Firebase } from '../lib/firebase.js';
import { Action, Actions } from 'react-native-router-flux'

export default class ReceiptItems extends Component {
  state = {
    receipt: this.props.items.receiptLines.split('\n'),
    parsedReceipt: [],
    bill: {},
    currentUser: null,
  };

  componentDidMount = async () => {
    const { currentUser } = await Firebase.auth();
    // console.log('current user', currentUser);
    this.setState({ currentUser: currentUser.email });
  };

  deleteItem = item => {
    let receipt = this.state.receipt;
    // console.log('receipt', receipt);
    let newReceipt = receipt.filter(itemObj => itemObj !== item);
    // console.log('new receipt', newReceipt);
    this.setState({ receipt: newReceipt });
  };

  processReceipt = () => {
    let receipt = this.state.receipt;
    console.log('state', this.state);
    let priceArr = [];
    let itemsArr = [];
    let receiptObj = {};
    let parsedReceipt = [];
    const regex = /^\d*\.?\d*$/g;
    receipt.forEach(ele => {
      if (Number(ele)) {
        if (ele.match(regex)) {
          priceArr.push(Number(ele));
        }
      } else {
        itemsArr.push(ele);
      }
    });
    itemsArr.forEach((ele, idx) => {
      const lastSpaceIdx = ele.lastIndexOf(' ');
      if (ele.slice(-3).match(regex)) {
        priceArr.splice(
          idx,
          0,
          isNaN(Number(ele.slice(lastSpaceIdx + 1)))
            ? 999.99
            : Number(ele.slice(lastSpaceIdx + 1)),
        );
      }
    });
    priceArr.forEach((price, idx) => {
      receiptObj[idx] = {
        name: itemsArr[idx],
        price: price,
        quantity: 1,
      };
      parsedReceipt.push({
        name: itemsArr[idx],
        price: price,
        quantity: 1,
      });
    });
    console.log('parsed receipt', parsedReceipt);
    this.setState({ parsedReceipt: parsedReceipt });
    setTimeout(() => this.createBill(), 5000);
    setTimeout(() => Actions.receipt({ match: { params: { id: String(1) } } }), 5000);
  };


  // findId = () => {
  //   // FirebaseRef.child('receipts').on('value', function(snapshot) {
  //   //   return snapshot.val().length;
  //   // });
  //   let count = 1;
  //   count++;
  //   return count;
  // }

  // findOtherId = () => {
  //   let count = -1;
  //   count++;
  //   return count;
  // }

  createBill = async() => {
    let id = 1
    let otherId = 0
    FirebaseRef.child(`receipts/${id}`)
      .set({
        id: id,
        author: this.state.currentUser,
        body: Date.now(),
        image: "https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5"
      });

    FirebaseRef.child(`receipts/${id}/users/${otherId}`)
      .set({
        id: otherId,
        email: this.state.currentUser
      });

    this.state.parsedReceipt.forEach((item) => {
      FirebaseRef.child(`receipts/${id}/items/${otherId}`)
        .set({
          id: otherId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          user_claim: '',
        });
    });
  };

  render() {
    // console.log(this.findId(), 'IN FIND ID')
    let { items } = this.props;
    // console.log('props', items.receiptLines);
    let receipt = this.state.receipt;
    // console.log('receipt', receipt);
    const receiptItems = receipt.map(itemObj => (
      <ListItem key={itemObj.id} rightIcon={{ style: { opacity: 0 } }}>
        <Text>{itemObj}</Text>
        <Button onPress={() => this.deleteItem(itemObj)} title="Delete" />
      </ListItem>
    ));

    return (
      <ScrollView>
        <Button onPress={() => this.processReceipt()} title="Process Receipt" />

        <Container>
          <Card>
            <CardItem header bordered>
              <Text>Receipt Items</Text>
            </CardItem>
            <CardItem>
              <Content>
                <List>{receiptItems}</List>
              </Content>
            </CardItem>
          </Card>
        </Container>
      </ScrollView>
    );
    // }
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
