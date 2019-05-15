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
    loading: false,
    currentUser: null,
    userName: null
  };


  componentDidMount = async () => {
    this.fetchData();
    const { currentUser } = await Firebase.auth();    
    // console.log('current user', currentUser);
    this.setState({ currentUser: currentUser.email });
  };


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
    const { Layout, receipts, match} = this.props;
    const { loading, error, currentUser} = this.state;
    const id =
      match && match.params && match.params.id ? match.params.id : null;

    return (
      <Layout
        receiptId={id}
        error={error}
        loading={loading}
        receipts={receipts}
        reFetch={() => this.fetchData()}
        currentUser={currentUser}
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
