import React, { Component } from "react";
const { FirebaseRef } = require("../../../lib/firebase.js");
import { StyleSheet } from "react-native";
import Spacer from "../UI/Spacer";

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
  Input,
  Item
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
      <ScrollView>
        <Spacer size={10} />
        <CardItem>
          <Content>
            <Form>
              <Spacer size={10} />
              <Text style={styles.text}>Item Name :</Text>
              <Item rounded>
                <Input
                  onChange={this.handleChangeName}
                  placeholder="Enter item name here"
                />
              </Item>
              <Spacer size={10} />
              <Text style={styles.text}>Price :</Text>
              <Item rounded>
                <Input
                  placeholder="Enter item price here"
                  onChange={this.handleChangePrice}
                />
              </Item>
              <Spacer size={10} />
              <Text style={styles.text}>Quantity :</Text>
              <Item rounded>
                <Input
                  placeholder="Enter quantity here"
                  onChange={this.handleChangeQuantity}
                />
              </Item>
              <Spacer size={10} />
              <Text style={styles.text}>User :</Text>
              <Item rounded>
                <Input
                  placeholder="Enter user here"
                  onChange={this.handleChangeUser}
                />
              </Item>
              <Spacer size={10} />

              <Button
                rounded
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: "darkcyan",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default AddItemForm;
