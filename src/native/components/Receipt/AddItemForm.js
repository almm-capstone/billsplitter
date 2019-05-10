import React, { Component } from 'react';
const { FirebaseRef } = require('../../../lib/firebase.js');
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
} from 'native-base';
import { Image, ScrollView } from 'react-native';


class AddItemForm extends Component {
  state = {
    id: '',
    name: '',
    price: '',
    user_claim: ''
  }

  findItem = () => {
    console.log('CALLED FIND ITEM')
    let count = this.props.items.length;
    return count;
  }

  addItem = async(name, price, user_claim, id) => {
    let itemId = this.findItem();
    console.log(itemId);
    await FirebaseRef.child(`receipts/${this.props.receiptId}/items/${itemId}`).set({
      name,
      price,
      user_claim,
      id
    });
  };

  handleChangeName = e => {
    this.setState({
      name: e.nativeEvent.text,
    });
  };

  handleChangePrice = e => {
    this.setState({
      price: e.nativeEvent.text,
    });
  };

  handleChangeUser = e => {
    this.setState({
      user_claim: e.nativeEvent.text
    });
  };

  handleSubmitId = () => {
    this.setState({
      id: this.findItem()
    })
  }

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
      <ScrollView>
      <CardItem>
            <Content>
              <Form>
                <Text>Item Name :</Text>
                <Input defaultValue="Name" onChange={this.handleChangeName} />
                <Text>Price :</Text>
                <Input defaultValue="Price" onChange={this.handleChangePrice} />
                <Text>User</Text>
                <Input defaultValue="User" onChange={this.handleChangeUser} />
                <Button
                  // onPress={this.handleSubmitId}
                  // onPress={() => this.addItem(this.state.name, this.state.price, this.state.user_claim, this.state.id)}
                  onPress={() => {this.handleSubmitId(); this.addItem(this.state.name, this.state.price, this.state.user_claim, this.state.id);}}
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

export default AddItemForm;
