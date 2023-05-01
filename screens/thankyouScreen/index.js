import React, {useEffect, useState} from 'react';
import {ScrollView, View, Dimensions, Image} from 'react-native';
import {withTheme, Button, Appbar, Title, Paragraph} from 'react-native-paper';

const Thankyou = props => {
  useEffect(() => {
    const titleRec =!isEmpty(props.route.params)?props.route.params.title:'' //props.navigation.getParam('title', '');
    const bodyRec =!isEmpty(props.route.params.body)?props.route.params.body:''  // props.navigation.getParam('body', '');
    const typeRec = !isEmpty(props.route.params.type)?props.route.params.type:0 //props.navigation.getParam('type', 0);
    setTitle(titleRec);
    setBody(bodyRec);
    setType(typeRec);
  }, [props.navigation]);

  const isEmpty = (value) =>
  {
  
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
    console.log(c,'c')
    return c
   
  }

  const {colors} = props.theme;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const styles = {
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    innerContainer: {
      padding: 15,
      height: windowHeight - 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    backBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
      marginTop: 15,
    },
    thankyouCard: {
      marginBottom: 10,
      padding: 0,
      // backgroundColor: '#EBEBEB',
      borderRadius: 5,
      width: windowWidth < 768 ? 300 : 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    thankyouInnerCard: {
      paddingTop: 40,
      paddingBottom: 40,
      alignItems: 'center',
    },
    cardTitle: {
      textAlign: 'center',
      paddingBottom: 5,
      paddingTop: 20,
      color: type === 'error' ? 'red' : colors.primary,
    },
    appbar: {
      height: 40,
    },
    cardDescription: {
      fontSize: 15,
      textAlign: 'center',
      paddingBottom: 5,
    },
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {/* <Appbar style={styles.appbar}>
        <Appbar.Content titleStyle={styles.subheader} title="Thank you" />
      </Appbar> */}
      <View style={styles.innerContainer}>
        <View style={styles.thankyouCard}>
          <View style={styles.thankyouInnerCard}>
            {type === 'error' ? (
              <Image
                source={require('../../assets/images/payment-unsuccessful.png')}
              />
            ) : null}
            {type === 'success' ? (
              <Image
                source={require('../../assets/images/payment-successful.png')}
              />
            ) : null}
            <Title style={styles.cardTitle}>{title}</Title>
            <Paragraph style={styles.cardDescription}>{body}</Paragraph>
            {type === 'error' ? (
              <Button
                style={styles.backBtn}
                mode="contained"
                onPress={() => props.navigation.navigate('Plans')}>
                Back To Plan
              </Button>
            ) : null}
            {type === 'success' ? (
              <Button
                style={styles.backBtn}
                mode="contained"
                onPress={() => props.navigation.navigate('Home')}>
                Back To Home
              </Button>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withTheme(Thankyou);
