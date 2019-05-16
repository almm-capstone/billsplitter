import React, { Component } from "react";
const { FirebaseRef } = require("../lib/firebase.js");
import {
  View,
  Button,
  TextInput,
  FlatList,
  AlertIOS,
  StyleSheet,
  TouchableHighlight,
  Switch,
  ScrollView
} from "react-native";
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
  Input
} from "native-base";
import { Firebase } from "../lib/firebase.js";
import { Actions } from "react-native-router-flux";

export default class ReceiptItems extends Component {
  state = {
    receipt: this.props.items.receiptLines.split("\n"),
    parsedReceipt: [],
    bill: {},
    currentUser: null,
    receiptID: 0,
    itemID: 0,
    userID: 0
  };

  handleSetReceiptID = snapshot => {
    let currentReceiptId = 0;
    currentReceiptId = snapshot.val().length;
    this.setState({ receiptID: currentReceiptId });
  };
  handleSetItemID = snapshot => {
    let currentItemId = 0;
    currentItemId = snapshot.val().length - 1;
    this.setState({ itemID: currentItemId });
  };
  handleSetUserID = snapshot => {
    let currentUserId = 0;
    currentUserId = snapshot.val().length - 1;
    this.setState({ userID: currentUserId });
  };

  componentDidMount = async () => {
    const { currentUser } = await Firebase.auth();
    // console.log('current user', currentUser);
    this.setState({ currentUser: currentUser.email });

    FirebaseRef.child("receipts").on("value", this.handleSetReceiptID);
    FirebaseRef.child(`receipts/${this.state.receiptID}/items`).on(
      "value",
      this.handleSetItemID
    );
    FirebaseRef.child(`receipts/${this.state.receiptID}/users`).on(
      "value",
      this.handleSetUserID
    );
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
    //console.log("state", this.state);
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
      const lastSpaceIdx = ele.lastIndexOf(" ");
      if (ele.slice(-3).match(regex)) {
        priceArr.splice(
          idx,
          0,
          isNaN(Number(ele.slice(lastSpaceIdx + 1)))
            ? 999.99
            : Number(ele.slice(lastSpaceIdx + 1))
        );
      }
    });
    priceArr.forEach((price, idx) => {
      receiptObj[idx] = {
        name: itemsArr[idx],
        price: price,
        quantity: 1
      };
      parsedReceipt.push({
        name: itemsArr[idx],
        price: price,
        quantity: 1
      });
    });
    // console.log("parsed receipt", this.state.parsedReceipt);
    this.setState({ parsedReceipt: parsedReceipt });
    setTimeout(() => this.createBill(), 4000);
    setTimeout(
      () =>
        Actions.receipt({
          match: { params: { id: String(`${this.state.receiptID}`) } }
        }),
      5000
    );
  };

  createBill = () => {
    // add a new receipt:
    FirebaseRef.child("receipts").off("value", this.handleSetReceiptID);
    FirebaseRef.child(`receipts/${this.state.receiptID}`).set({
      id: this.state.receiptID,
      author: this.state.currentUser,
      body: Date.now(),
      image:
        "https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5"
    });

    // add users to the current receipte:
    FirebaseRef.child(`receipts/${this.state.receiptID}/users`).off(
      "value",
      this.handleSetUserID
    );
    FirebaseRef.child(
      `receipts/${this.state.receiptID}/users/${this.state.userID}`
    ).set({
      id: this.state.userID,
      email: this.state.currentUser
    });

    // add new items to the current receipt:
    FirebaseRef.child(`receipts/${this.state.receiptID}/items`).off(
      "value",
      this.handleSetItemID
    );
    this.state.parsedReceipt.forEach(item => {
      FirebaseRef.child(
        `receipts/${this.state.receiptID}/items/${this.state.itemID}`
      ).set({
        id: this.state.itemID,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        user_claim: ""
      });
    });
  };

  render() {
    let receipt = this.state.receipt;
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
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#6565fc"
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center"
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    color: "white"
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center"
  },
  button: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});
