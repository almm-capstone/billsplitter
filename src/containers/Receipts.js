import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Firebase, FirebaseRef } from "../lib/firebase";

import { getReceipts, updateReceipts } from "../actions/receipts";

class ReceiptListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    receipts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
    fetchReceipts: PropTypes.func.isRequired,
    updateReceipts: PropTypes.func.isRequired
  };

  static defaultProps = {
    match: null
  };

  state = {
    error: null,
    loading: false
  };

  componentDidMount = () => this.fetchData();

  fetchData = data => {
    const { fetchReceipts } = this.props;

    this.setState({ loading: true });
    return fetchReceipts(data)
      .then(() =>
        this.setState({
          loading: false,
          error: null
        })
      )
      .catch(err =>
        this.setState({
          loading: false,
          error: err
        })
      );
  };

  componentWillUnmount() {
    return updateReceipts();
  }

  render = () => {
    // console.log("===================", Firebase);
    // Firebase.database()
    //   .ref("/users")
    //   .push("grace@email.com");
    const { Layout, receipts, match } = this.props;
    const { loading, error } = this.state;
    const id =
      match && match.params && match.params.id ? match.params.id : null;

    return (
      <Layout
        receiptId={id}
        error={error}
        loading={loading}
        receipts={receipts}
        reFetch={() => this.fetchData()}
      />
    );
  };
}

const mapStateToProps = state => ({
  receipts: state.receipts.receipts || []
});

const mapDispatchToProps = {
  fetchReceipts: getReceipts,
  updateReceipts: updateReceipts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptListing);
