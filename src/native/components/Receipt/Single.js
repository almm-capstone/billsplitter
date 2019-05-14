import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, View, Picker } from 'react-native';
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
import { errorMessages } from '../../../constants/messages';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';
import AddItemForm from './AddItemForm';
const { FirebaseRef } = require('../../../lib/firebase.js');
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { Firebase } from '../../../lib/firebase';
import PickedUser from './Picker.js';



const paymentJson = async(receiptId) => {

  let data;

  let currReceipt = await FirebaseRef.child(`/receipts/${receiptId}`);
  let finalVal = await currReceipt.on('value', function(snapshot) {
    data = snapshot.val();
  }, function(errorObject) {
    console.log('The read failed:' + errorObject.code);
  });
  // try {
  //   await axios.post('/pay', data);
  // } catch(error) {
  //   console.error(error)
  // }
  Actions.payment(data);
}

const deleteItem = (itemObj, receiptId) => {
  console.log('IN DELETE ITEM', itemObj);

  FirebaseRef.child(`receipts/${receiptId}/items/${itemObj}`)
    .set(null)
    .then(function() {
      console.log('Remove succeeded.');
    })
    .catch(function(error) {
      console.log('Remove failed: ' + error.message);
    });
};

const ReceiptView = ({ error, receipts, receiptId }) => {

  state = {
    pickerVal: 0,
  }
  // Error
  if (error) return <Error content={error} />;

  // Get this Receipt from all receipts
  let receipt = null;
  if (receiptId && receipts) {
    receipt = receipts.find(
      item => parseInt(item.id, 10) === parseInt(receiptId, 10)
    );
  }

  // Receipt not found
  if (!receipt) return <Error content={errorMessages.receipt404} />;

  // Items Delete listing
  const items = receipt.items.map(itemObj => (
    <ListItem key={itemObj.id} rightIcon={{ style: { opacity: 0 } }}>
      <Button onPress={() => deleteItem(itemObj.id, receipt.id)}>
        <Icon>X</Icon>
      </Button>
      <Text>      </Text>
      <Text>
        {itemObj.name}    ${itemObj.price}      {itemObj.user_claim}
      </Text>
    </ListItem>
  ));

  return (
    <Swiper
      loop={true}
      index={0}
    >
      <View>
        <Text>Assign Items</Text>
        <List>
            <PickedUser receipt={receipt} receiptId={receipt.id} />
        </List>
      </View>

      <View>
        <Text>Delete Items</Text>
          <List>
            {items}
          </List>
      </View>

      <View>
        <Text>Add Item</Text>
        <AddItemForm receiptId={receipt.id} items={items} />
      </View>
      <View>
      <Text>Checkout with Paypal!</Text>
          <Button
            // onPress={() => Actions.payment(); paymentJson(receipt.id)}
            onPress={() => paymentJson(receipt.id)}
          >
              <Text>Checkout</Text>
            </Button>
      </View>

        <Spacer size={20} />
    </Swiper>
  );
};

ReceiptView.propTypes = {
  error: PropTypes.string,
  receiptId: PropTypes.string.isRequired,
  receipts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ReceiptView.defaultProps = {
  error: null,
};

export default ReceiptView;
