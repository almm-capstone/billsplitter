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
// import console = require("console");

class AddItemForm extends Component {
  state = {
    id: "",
    name: "",
    price: "",
    user_claim: ""
  };
  // findItem = () => {
  //   console.log("CALLED FIND ITEM");
  //   let count = this.props.items.length;
  //   return count;
  // };

  addItem = (name, price, user_claim, id) => {
    FirebaseRef.child(
      `receipts/${this.props.receiptId}/items/${this.props.items.length}`
    ).set({
      name,
      price,
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
      price: e.nativeEvent.text
    });
  };

  handleChangeUser = e => {
    this.setState({
      user_claim: e.nativeEvent.text
    });
  };

  // handleSubmitId = () => {
  //   this.setState({
  //     id: `${this.props.items.length + 1}`
  //   });
  // };

  // handleSubmit = () => {
  //   this.setState({
  //     id: this.findItem()
  //   }),
  //   addItem(
  //     this.state.name,
  //     this.state.price,
  //     this.state.user_claim,
  //     this.state.id
  //   );
  //   AlertIOS.alert('Item saved to database!');
  // };

  render() {
    return (
        <CardItem containerStyle={{height: 50}}>
          <Content>
            <Form scrollEnabled={false}>
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
              <Text>User</Text>
              <Input
                placeholder="Enter user here"
                onChange={this.handleChangeUser}
              />
              <Button
                // onPress={this.handleSubmitId}
                onPress={() =>
                  this.addItem(
                    this.state.name,
                    this.state.price,
                    this.state.user_claim,
                    this.state.id
                  )
                }
                // onPress={() => {
                //   this.handleSubmitId();
                //   this.addItem(
                //     this.state.name,
                //     this.state.price,
                //     this.state.user_claim,
                //     this.state.id
                //   );
                // }}
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
