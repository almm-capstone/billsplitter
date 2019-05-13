import React from "react";
import PropTypes from "prop-types";
import { Image, ScrollView, TextInput } from "react-native";
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
import { errorMessages } from "../../../constants/messages";
import Error from "../UI/Error";
import Spacer from "../UI/Spacer";
import AddItemForm from "./AddItemForm";
const { FirebaseRef } = require("../../../lib/firebase.js");
import { Actions } from "react-native-router-flux";
import axios from "axios";
// import console = require('console');

const deleteItem = (itemObj, receiptId) => {
  console.log("IN DELETE ITEM", itemObj);

  FirebaseRef.child(`receipts/${receiptId}/items/${itemObj}`)
    .set(null)
    .then(function() {
      console.log("Remove succeeded.");
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message);
    });
};

const ReceiptView = ({ error, receipts, receiptId }) => {
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

  // Build Items listing
  const items = receipt.items.map(itemObj => (
    <ListItem key={itemObj.id} rightIcon={{ style: { opacity: 0 } }}>
      <Button onPress={() => deleteItem(itemObj.id, receipt.id)}>
        <Icon>X</Icon>
      </Button>
      <Text> </Text>
      <Text>
        {itemObj.name} ${itemObj.price} {itemObj.user_claim}
      </Text>
    </ListItem>
  ));

  const totalAmount = receipt.items.reduce((accumulator, currentItem) => {
    let totalFloat = accumulator + Number(currentItem.price);
    let finalTotal = Math.round(totalFloat * 100) / 100;

    //await axios.post("/pay", finalTotal);
    return finalTotal;
  }, 0);

  axios.post(`/api/pay/${totalAmount}`, { totalAmount }).then(res => {
    console.log(res);
    console.log(res.data);
  });

  return (
    <ScrollView>
      <Container>
        <Content padder>
          <Image
            source={{ uri: receipt.image }}
            style={{ height: 100, width: null, flex: 1 }}
          />

          <Spacer size={25} />
          <H3>{receipt.title}</H3>
          <Text>by {receipt.author}</Text>
          <Spacer size={15} />

          <Card>
            <CardItem header bordered>
              <Text>About this receipt</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{receipt.body}</Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Receipt Items</Text>
            </CardItem>
            <CardItem>
              <Content>
                <List>{items}</List>
              </Content>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Add Item</Text>
            </CardItem>
            <AddItemForm
              receiptId={receipt.id}
              items={items}
              totalAmount={totalAmount}
            />
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Checkout with Paypal!</Text>
            </CardItem>
            <CardItem>
              <Text>Total amount: {totalAmount}</Text>
            </CardItem>
            <CardItem>
              <Button onPress={() => Actions.payment()}>
                <Text>Checkout</Text>
              </Button>
            </CardItem>
          </Card>

          <Spacer size={20} />
        </Content>
      </Container>
    </ScrollView>
  );
};

ReceiptView.propTypes = {
  error: PropTypes.string,
  receiptId: PropTypes.string.isRequired,
  receipts: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

ReceiptView.defaultProps = {
  error: null
};
export default ReceiptView;
