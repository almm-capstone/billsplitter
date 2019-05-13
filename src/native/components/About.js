import React from 'react';
import { Container, Content, Text, H1, H2, Separator } from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';
import Spacer from './UI/Spacer';

const About = () => (
  <Container style={styles.container}>
    <Content padder>

      <Spacer size={30} />
      <H1 style={styles.whiteText}>
      <Text>✨</Text>
      AppName
      <Text>✨</Text>
      </H1>
      <Spacer size={10} />
      <Text style={styles.paragraphText}>This is a cool app for paying your friends. </Text>
      <Spacer size={30} />

      <Separator></Separator>

      <Spacer size={30} />
      <H2 style={styles.whiteText}>
      Take a Picture of Your Receipt!
      </H2>
      <H2 style={styles.whiteText}>📸</H2>
      <Spacer size={10} />
      <Text style={styles.paragraphText}>
        Make sure to focus on the relevant parts, like item name, price, tax, and total! Save your receipt
        to the gallery then choose the one you would like to split.{' '}
      </Text>
      <Spacer size={30} />

      <Separator></Separator>

      <Spacer size={30} />
      <H2 style={styles.whiteText}>Claim and Assign Your Items!</H2>
      <H2 style={styles.whiteText}>💸</H2>
      <Spacer size={10} />
      <Text style={styles.paragraphText}>
        Assign your items to the correct people then send out your request.{' '}
      </Text>
      <Spacer size={30} />

      <Separator></Separator>

    </Content>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'darkcyan',
  },
  whiteText: {
    color: 'white',
    textAlign: 'center'
  },
  paragraphText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  }
});

export default About;
