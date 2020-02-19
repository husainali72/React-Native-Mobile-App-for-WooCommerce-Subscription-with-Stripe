import React from 'react';
import {View, ScrollView, Image, Dimensions} from 'react-native';
import {
  Title,
  withTheme,
  Paragraph,
  Button,
  List,
  Appbar,
} from 'react-native-paper';

const About = props => {
  const {colors} = props.theme;
  const styles = {
    innerContainer: {
      padding: 15,
    },
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    aboutTitle: {
      color: colors.secondary,
      fontSize: 16,
      lineHeight: 25,
      marginBottom: 10,
    },
    aboutParagraph: {
      fontSize: 16,
      lineHeight: 25,
      color: '#3A3A3A',
    },
    registerOuter: {
      marginTop: 30,
      marginBottom: 35,
    },
    registerBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
    },
    aboutSecondTitle: {
      color: colors.secondary,
      fontSize: 16,
      lineHeight: 25,
      marginBottom: 10,
      // textAlign: 'center',
    },
    aboutSecondParagraph: {
      fontSize: 16,
      lineHeight: 25,
      color: '#3A3A3A',
      // textAlign: 'center',
    },
    accordianDescription: {
      backgroundColor: '#EBEBEB',
      padding: 10,
      margin: 0,
      fontSize: 14,
      lineHeight: 25,
    },
    accordion: {
      backgroundColor: colors.primary,
      borderRadius: 5,
      marginBottom: 3,
      marginTop: 3,
      padding: 2,
      fontSize: 16,
    },
    accordionTitle: {
      color: '#fff',
      fontSize: 14,
    },
    accordianwrapper: {
      marginTop: 30,
      marginBottom: 20,
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    appbar: {
      height: 40,
    },
    bannerWapper: {
      height: Dimensions.get('window').width < 768 ? 300 : 600,
    },
    bannerImage: {
      flex: 1,
      resizeMode: 'cover',
      width: null,
      height: null,
    },
  };

  return (
    <>
      <Appbar style={styles.appbar}>
        <Appbar.Content titleStyle={styles.subheader} title="About" />
      </Appbar>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.bannerWapper}>
          <Image
            source={require('../../assets/images/about-us-img.png')}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.innerContainer}>
          <Title style={styles.aboutTitle}>
            LET Company Name TAKE A LOAD OFF AND HELP SIMPLIFY YOUR MEDICAL
            NEEDS.
          </Title>
          <Paragraph style={styles.aboutParagraph}>
            We’ve been in the same position. We know how inconvenient and costly
            it can be if you happen to get sick the day before a big meeting. Or
            when you get the dreaded call at work to come pick up your child
            because they have a fever. Not only is it virtually impossible to
            get a same-day appointment, but the alternative is that you have to
            deal with crowded clinics full of sick people, long wait times and
            most often, very expensive ER bills.
          </Paragraph>
          <View style={styles.registerOuter}>
            <Button
              style={styles.registerBtn}
              mode="contained"
              onPress={() => props.navigation.navigate('Plans')}>
              Register
            </Button>
          </View>
          <Title style={styles.aboutSecondTitle}>
            Company Name HAS A PLAN FOR BUSY FOLKS LIKE YOU!
          </Title>
          <Paragraph style={styles.aboutSecondParagraph}>
            Company Name works with Telehealth Professionals to ensure the best
            doctor experience possible for you.
          </Paragraph>
          <View style={styles.accordianwrapper}>
            <List.Accordion
              title="REGISTER WITH Company Name"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}>
              <List.Item
                title="Simply register with Company Name then check your email for further instructions. We will get you on your way to feeling better quickly."
                titleNumberOfLines={12}
                titleStyle={styles.accordianDescription}
              />
            </List.Accordion>
            <List.Accordion
              title="TALK TO A DOCTOR OR COUNSELOR"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}>
              <List.Item
                title="You can either call Member Services or log into your member portal using the mobile app or site to schedule a consultation."
                titleNumberOfLines={12}
                titleStyle={styles.accordianDescription}
              />
            </List.Accordion>
            <List.Accordion
              title="IT’S TOTALLY AFFORDABLE"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}>
              <List.Item
                title="We understand that with the rising costs of healthcare, doctor’s office, urgent care clinics and Emergency Room visits can be very expensive. While Company Name is not offering health insurance, access to this amazing service is both affordable and convenient."
                titleNumberOfLines={12}
                titleStyle={styles.accordianDescription}
              />
            </List.Accordion>
            <List.Accordion
              title="IT’S PORTABLE"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}>
              <List.Item
                title="The benefit of telemedicine follows you if you relocate or are out of town on vacation or work trip."
                titleNumberOfLines={12}
                titleStyle={styles.accordianDescription}
              />
            </List.Accordion>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default withTheme(About);
