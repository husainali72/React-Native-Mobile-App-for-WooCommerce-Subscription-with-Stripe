import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import {
  withTheme,
  Title,
  Paragraph,
  Button,
  Appbar,
  ActivityIndicator,
} from 'react-native-paper';
import WCAPI from '../../services/woocommerce';

const Plans = props => {
  const {colors} = props.theme;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    getProducts();

    // Dummy Data
    /*setplans([
      {
        id: 1,
        regular_price: 25,
        name: 'Weekly',
        intervalType: 'Week',
        signUpFee: 2.5,
      },
      {
        id: 2,
        regular_price: 100,
        name: 'Monthly',
        intervalType: 'Month',
        signUpFee: 10,
      },
    ]);*/
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [plans, setplans] = useState([]);
  const styles = {
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    innerContainer: {
      padding: 15,
    },
    registerWrapper: {
      alignItems: 'center',
      flexDirection: windowWidth < 768 ? 'column' : 'row',
      justifyContent: windowWidth < 768 ? 'center' : 'space-between',
    },
    registerCard: {
      marginBottom: 10,
      marginTop: 10,
      padding: 0,
      backgroundColor: '#EBEBEB',
      borderRadius: 5,
      width: windowWidth < 768 ? windowWidth - 20 : windowWidth / 2 - 20,
    },
    cardTitleWrapper: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
    },
    cardDescription: {
      paddingVertical: 20,
    },
    cardTitle: {
      color: colors.light,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    registerTitle: {
      color: colors.secondary,
      fontSize: 16,
      lineHeight: 25,
    },
    registerParagraph: {
      fontSize: 16,
      lineHeight: 25,
      color: '#3A3A3A',
      marginBottom: 20,
    },
    registerBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
      marginTop: 15,
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    headline: {
      fontSize: 35,
      lineHeight: 80,
      textAlign: 'center',
      color: colors.primary,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      color: '#000',
      fontWeight: '400',
    },
    appbar: {
      height: 40,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    loadingText: {
      marginTop: 10,
    },
  };

  const getProducts = () => {
    setIsLoading(true);
    setisError(false);

    WCAPI.get('products', {type: 'subscription', status: 'publish'}).then(
      data => {
        var plansData = data;
        for (var i = 0; i < plansData.length; i++) {
          for (var m = 0; m < plansData[i].meta_data.length; m++) {
            if (plansData[i].meta_data[m].key === '_subscription_period') {
              plansData[i].intervalType = plansData[i].meta_data[m].value;
            }
            if (plansData[i].meta_data[m].key === '_subscription_sign_up_fee') {
              plansData[i].signUpFee = plansData[i].meta_data[m].value;
            }
          }

          if (plansData[i].signUpFee) {
            plansData[i].total_fee =
              parseFloat(plansData[i].regular_price) +
              parseFloat(plansData[i].signUpFee);
          } else {
            plansData[i].total_fee = parseFloat(plansData[i].regular_price);
          }
        }
        setplans(plansData);
        setIsLoading(false);
      },
      err => {
        console.log(err);
        setisError(true);
      },
    );
  };

  const Register = plan => {
    props.navigation.navigate('CartNavigator', {
      plan: plan,
    });
  };

  return (
    <>
      {isLoading === true ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          {isError === true ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Something went wrong</Text>
            </View>
          ) : (
            <>
              <Appbar style={styles.appbar}>
                <Appbar.Content
                  titleStyle={styles.subheader}
                  title="Register"
                />
              </Appbar>
              <ScrollView style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                  <View>
                    <Title style={styles.registerTitle}>
                      IT’S SUPER COST-EFFECTIVE
                    </Title>
                    <Paragraph style={styles.registerParagraph}>
                      We have the lowest price out there for this amazing
                      service.
                    </Paragraph>
                  </View>

                  <View style={styles.registerWrapper}>
                    {plans &&
                      plans !== null &&
                      plans.map((plan, index) => (
                        <View style={styles.registerCard} key={index}>
                          <View style={styles.cardTitleWrapper}>
                            <Text style={styles.cardTitle}>{plan.name}</Text>
                          </View>
                          <View style={styles.cardDescription}>
                            <Text style={styles.headline}>
                              ${plan.regular_price}
                              <Text style={styles.caption}>
                                {' '}
                                / {plan.intervalType}
                              </Text>
                            </Text>
                            <Button
                              style={styles.registerBtn}
                              mode="contained"
                              onPress={() => Register(plan)}>
                              Register
                            </Button>
                          </View>
                        </View>
                      ))}
                  </View>
                </View>
              </ScrollView>
            </>
          )}
        </>
      )}
    </>
  );
};

export default withTheme(Plans);
