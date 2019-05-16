import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  WebView,
  Image,
  StyleSheet
} from "react-native";
import axios from "axios";

export default class Payment extends React.Component {
  state = {
    showModal: false,
    status: "Pending"
  };
  handleResponse = data => {
    if (data.title === "success") {
      this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
      this.setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  };
  render() {
    return (
      <View style={{ marginTop: 100 }}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <WebView
            //source={{ uri: "http://localhost:3000" }}
            source={{ uri: "https://www.sandbox.paypal.com/us/signin" }}
            onNavigationStateChange={res => this.handleResponse(res)}
            //injectedJavaScript={`document.f1.submit()`}
          />
        </Modal>
        <TouchableOpacity
          style={{ width: 300, height: 200 }}
          onPress={() => this.setState({ showModal: true })}
        >
          <Image
            style={styles.paypal}
            source={{
              uri:
                "https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_150x38.png"
            }}
            alt="PayPal"
          />
        </TouchableOpacity>
        <Text>Payment Status: {this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paypal: {
    width: 200,
    height: 51
  }
});
