import React, { Component } from "react";
const { FirebaseRef } = require("../../../lib/firebase.js");
import { Content, CardItem, Text, Button, Form, Input } from "native-base";
import { ScrollView } from "react-native";
// import console = require("console");

class AddUserForm extends React.Component {
  state = {
    user: "",
    id: 0
  };

  addItem = user => {
    FirebaseRef.child(
      `receipts/${this.props.receiptId}/users/${this.props.users.length}`
    ).set({ email: user, id: this.state.id });
  };

  handleChangeUser = e => {
    this.setState({
      user: e.nativeEvent.text,
      id: this.props.users.length
    });
  };

  render() {
    return (
      <ScrollView>
        <CardItem>
          <Content>
            <Form>
              <Text> User email :</Text>
              <Input
                placeholder="Enter your friend's email here!"
                onChange={this.handleChangeUser}
              />
              <Button onPress={() => this.addItem(this.state.user)}>
                <Text>Add User</Text>
              </Button>
            </Form>
          </Content>
        </CardItem>
      </ScrollView>
    );
  }
}

export default AddUserForm;
