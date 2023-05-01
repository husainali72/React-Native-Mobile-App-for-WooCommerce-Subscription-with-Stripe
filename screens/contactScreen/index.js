import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import { withTheme, Title, Paragraph, Appbar } from 'react-native-paper';

const Contact = props => {
  const { colors } = props.theme;
  const windowWidth = Dimensions.get('window').width;
  const styles = {
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    innerContainer: {
      padding: 15,
      alignItems: 'center',
    },
    contactCard: {
      marginBottom: 10,
      padding: 0,
      backgroundColor: '#EBEBEB',
      borderRadius: 5,
      width: windowWidth < 768 ? windowWidth - 20 : 400,
    },
    contactCardTitleWrapper: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
    },
    contactDescription: {
      padding: 20,
    },
    contactCardTitle: { color: colors.light, fontSize: 16, textAlign: 'center' },
    contactTitle: {
      color: colors.primary,
      fontSize: 16,
      lineHeight: 25,
    },
    contactParagraph: {
      fontSize: 16,
      lineHeight: 25,
      color: '#000',
    },
    secondSec: {
      marginTop: 20,
    },
    submitBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
      marginTop: 15,
    },
    contactform: {
      marginTop: 20,
      marginBottom: 20,
    },
    textInput: {
      marginTop: 3,
      marginBottom: 3,
      backgroundColor: '#fff',
    },
    contactTelTitle: {
      fontSize: 16,
      marginBottom: 3,
    },
    contactTel: {
      color: colors.primary,
      fontSize: 18,
    },
    contactTelSecond: {
      marginTop: 20,
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    appbar: {
      height: 40,
    },
    bannerWapper: {
      height: windowWidth < 768 ? 325 : 625,
      marginBottom: 10,
    },
    bannerImage: {
      flex: 1,
      resizeMode: 'cover',
      width: null,
      height: null,
    },
  };

  const dialCall = number => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <>
      <Appbar style={styles.appbar}>
        <Appbar.Content titleStyle={styles.subheader} title="Contact" />
      </Appbar>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.bannerWapper}>
          <Image
            source={require('../../assets/images/contact-img.png')}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.contactCard}>
            <View style={styles.contactCardTitleWrapper}>
              <Text style={styles.contactCardTitle}>Contact</Text>
            </View>
            <View style={styles.contactDescription}>
              <View style={styles.contactTelFirst}>
                <Text style={styles.contactTelTitle}>
                  Member Services Department
                </Text>
                <TouchableOpacity onPress={() => dialCall('888-553-4941')}>
                  <Text style={styles.contactTel}>888-533-4941</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contactTelSecond}>
                <Text style={styles.contactTelTitle}>
                  Institution, Billing, Sales, or other questions
                </Text>
                <TouchableOpacity onPress={() => dialCall('844-267-8779')}>
                  <Text style={styles.contactTel}>844-267-8779</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contactTelSecond}>
                <Text style={styles.contactTelTitle}>Email</Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'mailto:info@everywhere.care?subject=everywhere.care&body=Hello',
                    )
                  }>
                  <Text style={styles.contactTel}>info@everywhere.care</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default withTheme(Contact);
