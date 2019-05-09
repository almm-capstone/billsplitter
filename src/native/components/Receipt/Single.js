import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, List, ListItem, Text,
} from 'native-base';
import { errorMessages } from '../../../constants/messages';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';
//import console = require('console');

const ReceiptView = ({
  error, receipts, receiptId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Receipt from all receipts
  let receipt = null;
  if (receiptId && receipts) {
    receipt = receipts.find(item => parseInt(item.id, 10) === parseInt(receiptId, 10));
  }

  // Receipt not found
  if (!receipt) return <Error content={errorMessages.receipt404} />;

  // Build Items listing
  const items = receipt.items.map(itemObj => (
    <ListItem key={itemObj.id} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{itemObj.name} ${itemObj.price}</Text>
    </ListItem>)
    );

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: receipt.image }} style={{ height: 100, width: null, flex: 1 }} />

        <Spacer size={25} />
        <H3>{receipt.title}</H3>
        <Text>
          by
          {' '}
          {receipt.author}
        </Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this receipt</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{receipt.body}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Receipt Items</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>{items}</List>
            </Content>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

ReceiptView.propTypes = {
  error: PropTypes.string,
  receiptId: PropTypes.string.isRequired,
  receipts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ReceiptView.defaultProps = {
  error: null,
};

export default ReceiptView;
