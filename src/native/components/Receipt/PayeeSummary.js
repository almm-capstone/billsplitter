import React, { Component } from "react";
const { FirebaseRef } = require("../../../lib/firebase.js");
import { Content, CardItem, Text, Button, Form, Input } from "native-base";
import { ScrollView, View } from "react-native";
import InvitationEmail from "../../../containers/InvitationEmail";

class PayeeSummary extends React.Component {
  reviewList = () => {
    let result = [];
    for (let i = 0; i < this.props.items.length; i++) {
      result.push(this.props.items[i].props.children[2].props.children);
    }
    return result;
  };

  totalAmount = () => {
    let total = {};
    let tax = 0.1;
    let tip = 0.2;
    for (let i = 0; i < this.props.items.length; i++) {
      let currentPayee = this.props.items[i].props.children[2].props
        .children[4];
      let currentAmount = this.props.items[i].props.children[2].props
        .children[2];

      if (!total[currentPayee]) {
        total[currentPayee] =
          currentAmount + currentAmount * tax + currentAmount * tip;
      } else {
        total[currentPayee] +=
          currentAmount + currentAmount * tax + currentAmount * tip;
      }
    }
    return total;
  };

  render() {
    //console.log("HELLO THERE", this.totalAmount());
    return (
      <ScrollView>
        <CardItem>
          <Content>
            <Form>
              <Text>Amounts Owed and Unclaimed items</Text>
              <Text />
              {Object.keys(this.totalAmount()).map((key, ind) => {
                return key ? (
                  <Text key={key}>
                    {key} needs to pay: ${this.totalAmount()[key].toFixed(2)} in
                    total!
                  </Text>
                ) : (
                  this.reviewList().map(el => {
                    if (!el[4]) {
                      return (
                        <Text key={key + "hello"}>
                          {" "}
                          ⚠️{el[0]} still need(s) to be claimed!
                        </Text>
                      );
                    }
                  })
                );
              })}
            </Form>
            <Text />
            <Text>Itemized List</Text>
            <Text />
            <Form>
              {this.reviewList().map((el, ind) => {
                return (
                  <View key={ind}>
                    <Text>Item Name: {el[0]}</Text>
                    <Text>Item Price: ${el[2].toFixed(2)}</Text>
                    <Text>Item Payee: {el[4]}</Text>
                    <Text>{"\n"}</Text>
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

export default PayeeSummary;