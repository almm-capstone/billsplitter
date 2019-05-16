import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  ScrollView,
  View,
  Picker,
  TextInput,
  StyleSheet
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
  Button,
  Icon,
  Form,
  Input
} from "native-base";
import { errorMessages } from "../../../constants/messages";
import Error from "../UI/Error";
import Spacer from "../UI/Spacer";
import AddItemForm from "./AddItemForm";
const { FirebaseRef, Firebase } = require("../../../lib/firebase.js");
import { Actions } from "react-native-router-flux";
import Swiper from "react-native-swiper";
import PickedUser from "./Picker.js";
import axios from "axios";
import AddUserForm from "./AddUserForm";
import InvitationEmail from "../../../containers/InvitationEmail";
import ReviewForm from "./ReviewForm";
import PayeeSummary from "./PayeeSummary";

const paymentJson = async receiptId => {
  let data;

  let currReceipt = await FirebaseRef.child(`/receipts/${receiptId}`);
  let finalVal = await currReceipt.on(
    "value",
    function(snapshot) {
      data = snapshot.val();
    },
    function(errorObject) {
      console.log("The read failed:" + errorObject.code);
    }
  );
  Actions.payment(data);
};

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

const deleteUser = (userId, receiptId) => {
  FirebaseRef.child(`receipts/${receiptId}/users/${userId}`)
    .set(null)
    .then(function() {
      console.log("Remove succeeded.");
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message);
    });
};

const ReceiptView = ({ error, receipts, receiptId, currentUser }) => {
  state = {
    pickerVal: 0
  };

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
      <Text> </Text>
      <Text>
        {itemObj.name} ${itemObj.price} {itemObj.user_claim}
      </Text>
    </ListItem>
  ));
  const users = receipt.users.map(user => (
    <ListItem key={user.id} rightIcon={{ style: { opacity: 0 } }}>
      <Button onPress={() => deleteUser(user.id, receipt.id)}>
        <Icon>X</Icon>
      </Button>
      <Text> </Text>
      <Text>{user.email}</Text>
    </ListItem>
  ));
  // const users = receipt

  //Is Author
  let isAuthor = false;
  if (receipt.author === currentUser) isAuthor = true;

  //Is On Bill
  let isOnBill = false;

  receipt.users.map(userObj => {
    if (userObj != null) {
      if (Object.values(userObj).includes(currentUser)) isOnBill = true;
    }
  });

  const totalAmount = receipt.items.reduce((accumulator, currentItem) => {
    let totalFloat = accumulator + Number(currentItem.price);
    let finalTotal = Math.round(totalFloat * 100) / 100;
    return finalTotal;
  }, 0);

  const authorView = (
    <Swiper style={styles.wrapper} loop={true} index={0}>
      <View styles={styles.slide5}>
        <Text style={styles.text}>Add More Users</Text>
        <AddUserForm receiptId={receipt.id} users={users} />
      </View>

      <View style={styles.slide2}>
        <Text style={styles.text}>Delete Items</Text>
        <List>{items}</List>
      </View>

      <View style={styles.slide1}>
        <Text style={styles.text}>Assign Items</Text>

        <List>
          <PickedUser receipt={receipt} receiptId={receipt.id} />
        </List>
      </View>

      <View>
        <Text style={styles.text}>Add Item</Text>
        <AddItemForm receiptId={receipt.id} items={items} />
      </View>

      <View>
        <Text>Review before closing...</Text>
        <ReviewForm items={items} users={users} />
      </View>
    </Swiper>
  );

  const assignUser = (user, itemObj) => {
    FirebaseRef.child(`receipts/${receiptId}/items/${itemObj}`).update({
      user_claim: user
    });
  };
  const payeeView = (
    <Swiper style={styles.wrapper} loop={true} index={0}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Claim Items</Text>

        <List>
          <View>
            {receipt.items
              .filter(item => item.user_claim === "")
              .map(itemObj => (
                <ListItem
                  key={itemObj.id}
                  rightIcon={{ style: { opacity: 0 } }}
                >
                  <Button onPress={() => assignUser(currentUser, itemObj.id)}>
                    <Icon>+</Icon>
                  </Button>
                  <Text>
                    {itemObj.name} ${itemObj.price}
                  </Text>
                </ListItem>
              ))}
          </View>
        </List>
      </View>
      <View>
        <Text>Review before closing...</Text>
        <PayeeSummary items={items} users={users} />
      </View>
    </Swiper>
  );

  let toDisplay;
  if (isAuthor) toDisplay = authorView;
  else if (isOnBill) toDisplay = payeeView;
  else toDisplay = <Text>This is not the bill you are looking for</Text>;

  return toDisplay;
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  slide4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  slide5: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  slide6: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  text: {
    color: "darkcyan",
    fontSize: 30,
    fontWeight: "bold"
  }
});

ReceiptView.propTypes = {
  error: PropTypes.string,
  receiptId: PropTypes.string.isRequired,
  receipts: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

ReceiptView.defaultProps = {
  error: null
};
export default ReceiptView;
