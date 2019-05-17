import React, { Component } from 'react';
const { FirebaseRef } = require('../../../lib/firebase.js');
import {
  Content,
  CardItem,
  Text,
  Button,
  Form,
  Input,
  Item,
} from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import Spacer from '../UI/Spacer';
// import console = require("console");

class AddUserForm extends React.Component {
  state = {
    user: '',
    id: 0,
  };

  addItem = user => {
    FirebaseRef.child(
      `receipts/${this.props.receiptId}/users/${this.props.users.length}`,
    ).set({ email: user, id: this.state.id });
    this.textInput.clear();
  };

  handleChangeUser = e => {
    this.setState({
      user: e.nativeEvent.text,
      id: this.props.users.length,
    });
  };

  submitAndClear = () => {
    this.addItem(this.state.user);
    this.setState({
      user: '',
    });
  };

  render() {
    return (
      <ScrollView>
        <Spacer size={10} />
        <CardItem style={styles.wrapper}>
          <Content scrollEnabled={false}>
            <Form>
              <Text style={styles.text}> User email :</Text>
              <Item rounded>
                <Input
                  placeholder="Enter your friend's email here!"
                  value={this.state.user}
                  onChange={this.handleChangeUser}
                />
              </Item>
              <Spacer size={15} />
              <Button rounded onPress={() => this.submitAndClear()}>
                <Text>Add User</Text>
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
    color: 'darkcyan',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default AddUserForm;
