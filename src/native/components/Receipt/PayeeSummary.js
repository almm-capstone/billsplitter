import React, { Component } from "react";
const { FirebaseRef } = require("../../../lib/firebase.js");
import { Content, CardItem, Text, Button, Form, Input } from "native-base";
import { ScrollView, View, StyleSheet } from "react-native";
import InvitationEmail from "../../../containers/InvitationEmail";

class PayeeSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  handleSetItems = snapshot => {
    this.setState({ items: snapshot.val().items });
  };

  componentDidMount() {
    FirebaseRef.child(`receipts/${this.props.receiptId}`).on(
      "value",
      this.handleSetItems
    );
  }

  totalAmount = () => {
    let total = {};
    for (let i = 0; i < this.state.items.length; i++) {
      let currentPayee = this.state.items[i].user_claim;
      let currentAmount = this.state.items[i].price;

      if (!total[currentPayee]) {
        total[currentPayee] = currentAmount;
      } else {
        total[currentPayee] += currentAmount;
      }
    }
    return total;
  };

  render() {
    // console.log("HELLO THERE. IAM ITEMS", this.state.items);
    return (
      <ScrollView>
        <CardItem>
          <Content>
            <Form>
              {this.state.items.map((item, ind) => {
                return item.user_claim ? (
                  <Text style={styles.text} key={ind}>
                    {item.user_claim} needs to pay: $
                    {this.totalAmount()[item.user_claim]} in total
                  </Text>
                ) : (
                  <Text style={styles.warnText} key={ind}>
                    ⚠️{item.name} still needs to be claimed!
                  </Text>
                );
              })}
            </Form>
            <Text />
            <Text style={styles.text}>=========================</Text>
            <Text />
            <Text style={styles.text}>Itemized List</Text>
            <Text />
            <Form>
              {this.state.items.map((el, ind) => {
                return (
                  <View key={ind}>
                    <Text style={styles.smText}>Item Name: {el.name}</Text>
                    <Text style={styles.smText}>
                      Item Price: ${Number(el.price).toFixed(2)}
                    </Text>
                    <Text style={styles.smText}>
                      Item Payee: {el.user_claim}
                    </Text>
                    <Text style={styles.smText}>{"\n"}</Text>
                  </View>
                );
              })}
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
  },
  warnText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20
  },
  smText: {
    color: "darkcyan",
    fontSize: 20
  }
});

export default PayeeSummary;
