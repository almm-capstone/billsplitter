import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import email from "react-native-email";

export default class InvitationEmail extends React.Component {
  allUsers = () => {
    let users = [];
    for (let i = 0; i < this.props.items.length; i++) {
      users.push(this.props.items[i].user_claim);
    }
    return users;
  };

  handleEmail = () => {
    let summary = () => {
      let content = [];
      this.props.items.map((el, ind) => {
        content.push(
          `${ind + 1}. item name: ${el.name} \n item price: $${
            el.price
          } \n item payee: ${el.user_claim}` + "\n\n"
        );
      });
      return content.slice(",").join(" ");
    };

    // let totalSummary = () => {
    //   let result = [];
    //   this.props.items.map(item => {
    //     result.push(`${key}: $${this.props.total[key]}` + "\n");
    //   });
    //   return result.slice(",").join(" ");
    // };

    const to = this.allUsers(); //["admin@email.com", "lesley@email.com"]; // string or array of email addresses
    email(to, {
      subject: "Don't forget to pay your tabs!!!",
      body: `Hey lovely,

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
          style={{ color: "darkcyan" }}
        >
          <Text>Send Email</Text>
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
