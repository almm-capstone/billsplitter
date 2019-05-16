import React, { Component } from "react";
const { FirebaseRef } = require("../../../lib/firebase.js");

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
  Button,
  Icon,
  Form,
  Input
} from "native-base";
import { Image, ScrollView } from "react-native";

class AddItemForm extends React.Component {
  state = {
    id: "",
    name: "",
    price: 0,
    quantity: 0,
    user_claim: ""
  };

  addItem = (name, price, quantity, user_claim, id) => {
    FirebaseRef.child(
      `receipts/${this.props.receiptId}/items/${this.props.items.length}`
    ).set({
      name,
      price,
      quantity,
      user_claim,
      id
    });
  };

  handleChangeName = e => {
    this.setState({
      name: e.nativeEvent.text,
      id: `${this.props.items.length}`
    });
  };

  handleChangePrice = e => {
    this.setState({
      price: Number(e.nativeEvent.text)
    });
  };

  handleChangeQuantity = e => {
    this.setState({
      quantity: Number(e.nativeEvent.text)
    });
  };

  handleChangeUser = e => {
    this.setState({
      user_claim: e.nativeEvent.text
    });
  };

  render() {
    return (
      <CardItem>
        <Content>
          <Form>
            <Text>Item Name :</Text>
            <Input
              placeholder="Enter item name here"
              onChange={this.handleChangeName}
            />
            <Text>Price :</Text>
            <Input
              placeholder="Enter item price here"
              onChange={this.handleChangePrice}
            />
            <Text>Quantity :</Text>
            <Input
              placeholder="Enter quantity here"
              onChange={this.handleChangeQuantity}
            />
            <Text>User</Text>
            <Input
              placeholder="Enter user here"
              onChange={this.handleChangeUser}
            />

            <Button
              onPress={() =>
                this.addItem(
                  this.state.name,
                  this.state.price,
                  this.state.quantity,
                  this.state.user_claim,
                  this.state.id
                )
              }
            >
              <Text>Add Item</Text>
            </Button>
          </Form>
        </Content>
      </CardItem>
    );
  }
}

export default AddItemForm;
