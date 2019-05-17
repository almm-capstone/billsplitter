import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from 'native-base';
import email from "react-native-email";

export default class InvitationEmail extends React.Component {
  allUsers = () => {
    let users = [];
    for (let i = 0; i < this.props.users.length; i++) {
      users.push(this.props.users[i].props.children[2].props.children);
    }
    return users;
  };

  handleEmail = () => {
    // console.log("LIST", this.props.list);
    // console.log("TOTAL", this.props.total);
    let summary = () => {
      let content = [];
      this.props.list.map((el, ind) => {
        content.push(
          `${ind}. item name: ${el[0]} \n item price: $${
            el[2]
          } \n item payee: ${el[4]}` + "\n\n"
        );
      });
      return content.slice(",").join(" ");
    };

    let totalSummary = () => {
      let result = [];
      let keys = Object.keys(this.props.total);
      keys.map(key => {
        result.push(`${key}: $${this.props.total[key]}` + "\n");
      });
      return result.slice(",").join(" ");
    };

    const to = this.allUsers(); //["admin@email.com", "lesley@email.com"]; // string or array of email addresses
    email(to, {
      subject: "Don't forget to pay your tabs!!!",
      body: `Hey lovely,

      Total Amount Summary
      ${totalSummary()} \n

      Here is a summary of the receipt: \n
      ${summary()} \n

      Have A Wonderful Day!
      `
    }).catch(console.error);
  };

  render() {
    //console.log("USERS", this.totalSummary()); //this.props.users[1].props.children[2].props.children);
    return (
      <View style={styles.container}>
        <Button
          block
          large
          onPress={this.handleEmail}
        >
        <Text>Close Receipt and Send Email</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
