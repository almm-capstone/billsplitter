import React from 'react';
import { Container, Content, Text, H1, H2, Separator } from 'native-base';
import { Image, StyleSheet, ImageBackground } from 'react-native';
import Spacer from './UI/Spacer';

const About = () => (
  <Container style={styles.container}>
    <Content padder>
      <Spacer size={10} />
      {/* <Image
        source={require('../../images/app-icon.png')}
        style={{ width: 150, height: 150, alignItems: 'center' }}
      /> */}
      <H1 style={styles.whiteText}>
        <Text>✨</Text>
        <Text>TABS</Text>
        <Text>✨</Text>
      </H1>
      <Spacer size={10} />
      <Text style={styles.paragraphText}>BILLSPLITTER </Text>
      <Spacer size={30} />
      <Separator />
      <Spacer size={30} />
      <H2 style={styles.whiteText}>Take a Picture of Your Receipt!</H2>
      <H2 style={styles.whiteText}>📸</H2>
      <Spacer size={10} />
      <Text style={styles.paragraphText}>
        Make sure to focus on the relevant parts, like item name, price, tax,
        and total! Save your receipt to the gallery then choose the one you
        would like to split.{' '}
      </Text>
      <Spacer size={30} />
      <Separator />
      <Spacer size={30} />
      <H2 style={styles.whiteText}>Claim and Assign Your Items!</H2>
      <H2 style={styles.whiteText}>💸</H2>
      <Spacer size={10} />
      <Text style={styles.paragraphText}>
        Assign your items to the correct people then send out your request.{' '}
      </Text>
      <Spacer size={30} />
      <Separator />
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F0EFF5',
  },
  whiteText: {
    color: 'black',
    textAlign: 'center',
  },
  paragraphText: {
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default About;
