import React from "react";
import { StyleSheet, Button, View } from "react-native";
import email from "react-native-email";

export default class InvitationEmail extends React.Component {
  state = {
    newUsers: this.props.users
  };

  handleEmail = () => {
    const to = ["tiaan@email.com", "foo@bar.com"]; // string or array of email addresses
    email(to, {
      subject: "Show how to use",
      body: "Some body right here"
    }).catch(console.error);
  };
  render() {
    return (
      <View>
        <Button title="Send Email" onPress={this.handleEmail} />
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
