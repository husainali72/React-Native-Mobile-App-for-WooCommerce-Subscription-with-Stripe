import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  UIManager,
  Platform,
  Dimensions,
} from 'react-native';
import {withTheme, Button, Title, ActivityIndicator} from 'react-native-paper';
import {CreditCardInput} from 'react-native-credit-card-input';
import {getStripeKey, getCustomApiBase} from '../../services/config';
import WCAPI from '../../services/woocommerce';
import WCAPIv1 from '../../services/woocommercev1';

var orderStatus = {};
var subscr_data = {};

const Billing = props => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const {colors} = props.theme;
  const windowWidth = Dimensions.get('window').width;
  const [creditCard, setCreditCard] = useState(null);
  const [creditCardError, setCreditCardError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState(true);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupondata, setCoupondata] = useState(null);

  const styles = {
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    innerContainer: {
      padding: 15,
      width: windowWidth < 768 ? windowWidth : 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    submitBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
      marginTop: 15,
    },
    textInput: {
      marginTop: 3,
      marginBottom: 3,
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    col: {
      flex: 1,
    },
    textInputcvv: {
      marginTop: 3,
      marginBottom: 3,
      marginLeft: 3,
    },
    textInputexpiry: {
      marginTop: 3,
      marginBottom: 3,
      marginRight: 3,
    },
    tabNavigation: {
      flexDirection: 'row',
    },
    paypalNav: {
      flex: 1,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
    },
    cardNav: {
      flex: 1,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
    },
    cardinfo: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 15,
      marginBottom: 10,
    },
    cardImg: {
      flex: 1,
      margin: 3,
    },
    cardTabTitle: {
      color: '#333',
      fontSize: 20,
      marginVertical: 10,
    },
    paypalicon: {
      width: 290,
      marginVertical: 30,
    },
    appbar: {
      height: 40,
    },
    customAppBar: {
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      flexDirection: 'row',
    },
    appbarheading: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    appbarprice: {
      position: 'absolute',
      top: 11,
      right: 0,
      color: '#ffffff',
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

  useEffect(() => {
    setIsLoading(true);
    const cstmrInfo = props.navigation.getParam('cstmrInfo', '');
    const plandata = props.navigation.getParam('planData', '');
    const totalPriceval = props.navigation.getParam('totalPriceData', 0);
    const couponData = props.navigation.getParam('couponData', '');
    setCoupondata(couponData);
    setCustomerInfo(cstmrInfo);
    setPlan(plandata);
    setTotalPrice(totalPriceval);
    setIsLoading(false);
  }, [props.navigation]);

  const padLeft = (strval, n = 2) => {
    return Array(n - String(strval).length + 1).join('0') + strval;
  };

  const getDateString = d => {
    var dformat =
      [d.getFullYear(), padLeft(d.getMonth() + 1), padLeft(d.getDate())].join(
        '-',
      ) +
      ' ' +
      [
        padLeft(d.getHours()),
        padLeft(d.getMinutes()),
        padLeft(d.getSeconds()),
      ].join(':');
    return dformat;
  };

  const getCardValue = form => {
    setCreditCard(form);
  };

  const submit = async () => {
    setIsLoading(true);
    let creditCardToken;
    try {
      creditCardToken = await getStripeToken(creditCard);
      if (creditCardToken.error) {
        setCreditCardError(creditCardToken.error.message);
        setIsLoading(false);
        return;
      }

      var cust_fullname = customerInfo.firstname + ' ' + customerInfo.lastname;

      var custInfo = {
        customer: {
          name: cust_fullname,
          address: {
            city: customerInfo.city,
            country: customerInfo.country,
            line1: customerInfo.streetaddress,
            line2: '',
            state: customerInfo.state,
          },
          email: customerInfo.email,
        },
        price: totalPrice.toString(),
        token: creditCardToken.id,
        password: customerInfo.password,
      };

      chargeCustomer(custInfo, creditCardToken.card.id);
    } catch (e) {
      setIsLoading(false);
      return;
    }
  };

  const chargeCustomer = (custInfoPrams, cardId) => {
    fetch(getCustomApiBase + 'register-source-user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(custInfoPrams),
    })
      .then(response => response.json())
      .then(data => {
        if (data['code'] === 200) {
          createOrder(data, cardId);
        } else {
          props.navigation.navigate('ThankyouNavigator', {
            title: 'Oops!',
            body: data['message'],
            type: 'error',
          });
        }
      })
      .catch(error =>
        handleError(
          'Something went wrong during charging for the subscription.',
        ),
      );
  };

  const getStripeToken = creditCardData => {
    if (!creditCard || creditCard === undefined || creditCard === null) {
      setCreditCardError('Please enter the credit card');
      setIsLoading(false);
      return true;
    }
    if (creditCard.valid === true) {
      setCreditCardError(null);
    } else {
      setCreditCardError('Credit Card value is incorrect');
      setIsLoading(false);
      return true;
    }
    const card = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc,
    };
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getStripeKey}`,
      },
      method: 'post',
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    }).then(response => response.json());
  };

  const createOrder = (stripeResponse, cardId) => {
    var wp_user_id = stripeResponse['user_id'];

    var stripe_customer = stripeResponse['customer'];

    var tempDate = new Date();
    var startDate = getDateString(tempDate);
    var endDate = '';

    if (plan.intervalType == 'day') {
      tempDate.setDate(tempDate.getDate() + 1);
      endDate = getDateString(tempDate);
    } else if (plan.intervalType == 'week') {
      tempDate.setDate(tempDate.getDate() + 7);
      endDate = getDateString(tempDate);
    } else if (plan.intervalType == 'month') {
      tempDate.setMonth(tempDate.getMonth() + 1);
      endDate = getDateString(tempDate);
    } else if (plan.intervalType == 'year') {
      tempDate.setFullYear(tempDate.getFullYear() + 1);
      endDate = getDateString(tempDate);
    }

    var customerBillingData = {
      first_name: customerInfo.firstname,
      last_name: customerInfo.lastname,
      address_1: customerInfo.streetaddress,
      address_2: '',
      city: customerInfo.city,
      state: customerInfo.state,
      postcode: customerInfo.zipcode,
      country: customerInfo.country,
      email: customerInfo.email,
      student_birth: customerInfo.birthdate,
      student_gender: customerInfo.gender,
      language: customerInfo.preferredLanguage,
      phone: customerInfo.phone,
    };

    var customerShippingData = {
      first_name: customerInfo.firstname,
      last_name: customerInfo.lastname,
      address_1: customerInfo.streetaddress,
      address_2: '',
      city: customerInfo.city,
      state: customerInfo.state,
      postcode: customerInfo.zipcode,
      country: customerInfo.country,
    };

    var billinAmount =
      parseFloat(plan.total_fee) - parseFloat(coupondata.amount.toString());

    var productDetails = [
      {
        product_id: plan.id,
        quantity: 1,
        subtotal: plan.total_fee.toString(),
        total: billinAmount.toString(),
      },
    ];

    var SubProductDetails = [
      {
        product_id: plan.id,
        quantity: 1,
        subtotal: plan.regular_price.toString(),
        total: (plan.regular_price - coupondata.recAmount).toString(),
        // total: plan.regular_price.toString(),
      },
    ];

    var couponData = {};
    var couponRecData = {};
    if (coupondata.code !== '') {
      couponData = [
        {
          code: coupondata.code,
          discount: coupondata.amount.toString(),
        },
      ];

      if (coupondata.recAmount > 0) {
        couponRecData = [
          {
            code: coupondata.code,
            discount: coupondata.recAmount.toString(),
          },
        ];
      }
    }

    var orderData = {
      payment_method: 'stripe',
      payment_method_title: 'Stripe (Credit Card)',
      set_paid: true,
      billing: customerBillingData,
      shipping: customerShippingData,
      line_items: productDetails,
      coupon_lines: couponData,
    };

    WCAPI.post('orders', orderData, {})
      .then(res => {
        if (res.status > 250) {
          setIsLoading(false);
          props.navigation.navigate('ThankyouNavigator', {
            title: 'Oops!',
            body:
              'Some error occurs while making subscription. Please try again later.',
            type: 'error',
          });
          return;
        }
        var orderDetails = res;

        subscr_data = {
          customer_id: wp_user_id,
          parent_id: orderDetails.id,
          status: 'active',
          billing_period: plan.intervalType,
          billing_interval: 1,
          start_date: startDate,
          next_payment_date: endDate,
          payment_method: 'stripe',
          payment_details: {
            post_meta: {
              _stripe_customer_id: stripe_customer.id,
              _stripe_card_id: cardId,
            },
          },
          coupon_lines: couponData,
          billing: customerBillingData,
          shipping: customerShippingData,
          line_items: SubProductDetails,
        };
        SubscriptionPlan(subscr_data, customerInfo);
      })
      .catch(error =>
        handleError(
          'Some error occurs while making subscription. Please try again later.',
        ),
      );
  };

  const SubscriptionPlan = subscrdata => {
    WCAPIv1.post('subscriptions', subscrdata)
      .then(res => {
        if (res.data && res.data.status) {
          if (res.data.status > 250) {
            setIsLoading(false);
            props.navigation.navigate('ThankyouNavigator', {
              title: 'Oops!',
              body:
                'Some error occurs while making subscription. Please try again later.',
              type: 'error',
            });
            return;
          }
        }

        orderStatus = {
          status: 'completed',
        };
        var subscriptionID = res.id;
        setCustomerInfo({
          ...customerInfo,
          subscription_id: subscriptionID,
        });
        OrderPut(subscr_data.parent_id, orderStatus);
      })
      .catch(error => {
        handleError(
          'Some error occurs while making subscription. Please try again later.',
        );
      });
  };

  const OrderPut = (orderId, status) => {
    WCAPI.put('orders/' + orderId, status)
      .then(res => {
        if (res.data && res.data.status) {
          if (res.data.status > 250) {
            setIsLoading(false);
            props.navigation.navigate('ThankyouNavigator', {
              title: 'Oops!',
              body:
                'Some error occurs while changing order status. Please contact to your vendor.',
              type: 'error',
            });
            return;
          }
        }
        setIsLoading(false);
        orderStatus = {};
        subscr_data = {};
        props.navigation.navigate('ThankyouNavigator', {
          title: 'Thank you',
          body: 'Your subscription has been registered successfully.',
          type: 'success',
        });
      })
      .catch(error =>
        handleError(
          'Some error occurs while changing order status. Please contact to your vendor.',
        ),
      );
  };

  const handleError = error => {
    setIsLoading(false);
    props.navigation.navigate('ThankyouNavigator', {
      title: 'Oops!',
      body: error,
      type: 'error',
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
          <View style={styles.customAppBar}>
            <Text style={styles.appbarheading}>Billing </Text>
            <Text style={styles.appbarprice}>
              $ {parseFloat(totalPrice).toFixed(2)} {'   '}
            </Text>
          </View>
          <ScrollView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.cardinfo}>
                <Image
                  source={require('../../assets/icons/visa.png')}
                  style={styles.cardImg}
                />
                <Image
                  source={require('../../assets/icons/american-exp.png')}
                  style={styles.cardImg}
                />
                <Image
                  source={require('../../assets/icons/discovercard.png')}
                  style={styles.cardImg}
                />
                <Image
                  source={require('../../assets/icons/master-card.png')}
                  style={styles.cardImg}
                />
              </View>

              <View>
                <Title style={styles.cardTabTitle}>
                  Pay securely using your credit card
                </Title>
              </View>

              {creditCardError === null ? null : (
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {creditCardError}
                </Text>
              )}

              <CreditCardInput
                onChange={form => getCardValue(form)}
                requiresName={true}
                allowScroll={true}
              />

              <View>
                <Button
                  style={styles.submitBtn}
                  mode="contained"
                  onPress={() => submit()}>
                  Enroll Now
                </Button>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default withTheme(Billing);
