import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Header from '../UI/Header';
import Spacer from '../UI/Spacer';

const ReceiptListing = ({ error, loading, receipts, reFetch, currentUser }) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item =>
    Actions.receipt({ match: { params: { id: String(item.id) } } });

const receiptsToFilter = receipts.map(receipt=>{
    if (receipt.users) return receipt.users.map(user=>{
      if (user.email === currentUser) return receipt
    })
  })

  const receiptsToFlatten = receiptsToFilter.filter(receipt => receipt[0] !== undefined)

  function flattener(arr) {
    return Array.prototype.concat(...arr)
  }

  const receiptsToShow = flattener(receiptsToFlatten)
  

  return (
    <Container>
      <Content padder>
        <Header
          title="Receipts"
          content="These are receipts you are assigned to"
        />

        <FlatList
          numColumns={2}
          data={receiptsToShow}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity
                  onPress={() => onPress(item)}
                  style={{ flex:1 }}
                >
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Spacer size={5} />
                  <Button block bordered small onPress={() => onPress(item)}>
                    <Text>{item.body}</Text>
                  </Button>
                  <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={reFetch} />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

ReceiptListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  receipts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

ReceiptListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default ReceiptListing;
