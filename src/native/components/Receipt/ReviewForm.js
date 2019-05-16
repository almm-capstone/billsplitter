import React, { Component } from "react";
const { FirebaseRef } = require("../../../lib/firebase.js");
import { Content, CardItem, Text, Button, Form, Input } from "native-base";
import { ScrollView, View, StyleSheet } from "react-native";
import InvitationEmail from "../../../containers/InvitationEmail";
import Spacer from "../UI/Spacer";

class ReviewForm extends React.Component {
  // console.log(
  //   "========reviewform",
  //   this.props.items[0].props.children[2].props.children
  // );
  reviewList = () => {
    let result = [];
    for (let i = 0; i < this.props.items.length; i++) {
      result.push(this.props.items[i].props.children[2].props.children);
    }
    return result;
  };

  totalAmount = () => {
    let total = {};
    for (let i = 0; i < this.props.items.length; i++) {
      let currentPayee = this.props.items[i].props.children[2].props
        .children[4];
      let currentAmount = this.props.items[i].props.children[2].props
        .children[2];

      if (!total[currentPayee]) {
        total[currentPayee] = currentAmount;
      } else {
        total[currentPayee] += currentAmount;
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
              {Object.keys(this.totalAmount()).map((key, ind) => {
                return key ? (
                  <Text style={styles.text} key={key}>
                    {key} need to pay: ${this.totalAmount()[key]} in total!
                  </Text>
                ) : (
                  this.reviewList().map(el => {
                    if (!el[4]) {
                      return (
                        <Text style={styles.warnText} key={key + "hello"}>
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
            <View>
              <InvitationEmail
                users={this.props.users}
                total={this.totalAmount()}
                list={this.reviewList()}
              />
            </View>

            <Text />

            <Text>Itemized List</Text>
            <Text />
            <Text style={styles.text}>Itemized List</Text>
            <Text />
            <Form>
              {this.reviewList().map((el, ind) => {
                return (
                  <View key={ind}>
                    <Text style={styles.smText}>Item Name: {el[0]}</Text>
                    <Text style={styles.smText}>
                      Item Price: ${Number(el[2]).toFixed(2)}
                    </Text>
                    <Text style={styles.smText}>Item Payee: {el[4]}</Text>
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

export default ReviewForm;
