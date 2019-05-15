import React, { Component } from 'react';
import { Picker, View, ScrollView } from 'react-native';
import {
  ListItem,
  Button,
  Icon,
  Text
 } from 'native-base';
import { Firebase } from '../../../lib/firebase';
const { FirebaseRef } = require('../../../lib/firebase.js');


class PickedUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerVal: 0,
      selectedUser: ""
    };
  }

  render() {
    const receipt = this.props.receipt;
    const receiptId = this.props.receiptId;

    const receiptUsers = receipt.users.map(user => (
      <Picker.Item key={user.id} label={user.email} value={user.id} />
    ));

    const assignUser = (user, itemObj) => {
      FirebaseRef.child(`receipts/${receiptId}/items/${itemObj}`)
        .update({
          user_claim: user,
        });
    };

    return (
      <ScrollView>
        <View>
          {receipt.items
            .filter(item => item.user_claim === "")
            .map(itemObj => (
              <ListItem key={itemObj.id} rightIcon={{ style: { opacity: 0 } }}>
                <Picker
                  style={{ width: 100 }}
                  selectedValue={this.state.pickerVal}
                  onValueChange={(value, label) =>
                    this.setState({
                      pickerVal: value,
                      selectedUser: receiptUsers[value].props.label
                    })
                  }
                >
                  {receiptUsers}
                </Picker>
                <Button
                  onPress={() =>
                    assignUser(this.state.selectedUser, itemObj.id)
                  }
                >
                  <Icon>+</Icon>
                </Button>
                <Text>
                  {itemObj.name} ${itemObj.price}
                </Text>
              </ListItem>
            ))}
        </View>
      </ScrollView>
    );

  }
}

export default PickedUser;
