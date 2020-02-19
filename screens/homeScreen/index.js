import React from 'react';
import {ScrollView, Image, View, Dimensions} from 'react-native';
import {withTheme, Appbar, Title, Paragraph, Button} from 'react-native-paper';

const Home = props => {
  const {colors} = props.theme;
  const windowWidth = Dimensions.get('window').width;
  // =======================================Custom Style=======================================
  const styles = {
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    innerContainer: {
      padding: 15,
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    slider: {
      width: 240,
      height: 225,
      backgroundColor: colors.primary,
      margin: 3,
      borderRadius: 20,
    },
    sliderImg: {
      flex: 2,
      width: 240,
    },
    sliderTxt: {
      flex: 1,
      padding: 10,
    },
    heading: {
      fontSize: 16,
      color: colors.light,
      lineHeight: 22,
      marginTop: 5,
    },
    subheading: {
      fontSize: 14,
      color: colors.light,
    },
    slideimg: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    secondSec: {
      marginTop: 25,
      marginBottom: 25,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      color: colors.secondary,
      alignItems: 'center',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#323232',
      alignItems: 'center',
      textAlign: 'center',
    },
    stepsWrapper: {
      alignItems: 'center',
      flexDirection: windowWidth < 768 ? 'column' : 'row',
      justifyContent: windowWidth < 768 ? 'center' : 'space-between',
    },
    steps: {
      backgroundColor: '#F9F9F9',
      padding: 10,
      marginVertical: 10,
      borderWidth: 0.5,
      borderColor: '#ddd',
      width: windowWidth < 768 ? windowWidth - 20 : windowWidth / 3 - 20,
    },
    stepsTitle: {
      fontSize: 15,
      color: colors.primary,
      textAlign: 'center',
    },
    stepsParagraph: {
      fontSize: 14,
      color: '#323232',
      textAlign: 'center',
    },
    registerBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 15,
    },
    appbar: {
      height: 40,
    },
  };

  // =======================================Slider Component=======================================
  const Slider = props => {
    return (
      <View style={styles.slider}>
        <View style={styles.sliderImg}>
          <Image source={props.imgUri} style={styles.slideimg} />
        </View>
        <View style={styles.sliderTxt}>
          <Paragraph style={styles.subheading}>{props.subheader}</Paragraph>
          <Title style={styles.heading}>{props.header}</Title>
        </View>
      </View>
    );
  };
  //======================================== Steps Component=======================================
  const Steps = props => {
    return (
      <View style={styles.steps}>
        <Title style={styles.stepsTitle}>{props.stepsTitle}</Title>
        <Paragraph style={styles.stepsParagraph}>
          {props.stepsParagraph}
        </Paragraph>
      </View>
    );
  };

  return (
    <>
      <Appbar style={styles.appbar}>
        <Appbar.Content titleStyle={styles.subheader} title="Home" />
      </Appbar>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Slider
                imgUri={require('../../assets/images/slides-two.png')}
                subheader="Going to Miss Work"
                header="And need a doctor’s note?"
              />
              <Slider
                imgUri={require('../../assets/images/slides-three.png')}
                subheader="No time to wait in a busy ER or"
                header="Urgent care waiting rooms?"
              />
              <Slider
                imgUri={require('../../assets/images/slides-one.png')}
                header="And See a Doctor?"
                subheader="Rather Stay Home"
              />
              <Slider
                imgUri={require('../../assets/images/slides-four.png')}
                subheader="Need Privacy with a"
                header="Medical Professional?"
              />
            </ScrollView>
          </View>

          <View style={styles.secondSec}>
            <Title style={styles.title}>YOU CAN GET STARTED RIGHT NOW!</Title>
            <Paragraph style={styles.subtitle}>
              Simply follow these three steps to be on your way to getting the
              medical services you need.
            </Paragraph>
          </View>

          <View style={styles.stepsWrapper}>
            <Steps
              stepsTitle="CLICK REGISTER NOW"
              stepsParagraph="Just click the “Register Now” button anywhere on our site. Choose a monthly or yearly subscription and add payment details to checkout"
            />
            <Steps
              stepsTitle="CHECK YOUR EMAIL"
              stepsParagraph="Follow the instructions in your email."
            />
            <Steps
              stepsTitle="YOU’RE READY TO GO"
              stepsParagraph="Logon to your Member Portal using your Member ID."
            />
          </View>
          <Button
            style={styles.registerBtn}
            mode="contained"
            onPress={() => props.navigation.navigate('Plans')}>
            Register Now
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default withTheme(Home);
