import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  withTheme,
  Title,
  Button,
  Appbar,
  DataTable,
  Dialog,
  Portal,
  Subheading,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {getCustomApiBase} from '../../services/config';

const Cart = props => {
  const {colors} = props.theme;
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setplan] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState(false);
  const [coupondata, setCoupondata] = useState({
    code: '',
    amount: 0,
    codeId: '',
    recAmount: 0,
  });
  const windowWidth = Dimensions.get('window').width;
  const styles = {
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    innerContainer: {
      padding: 15,
      width: windowWidth < 768 ? windowWidth : 425,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cartItemCard: {
      marginBottom: 10,
      marginTop: 10,
      padding: 0,
      backgroundColor: '#EBEBEB',
      borderRadius: 5,
    },
    cardTitleWrapper: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
    },
    cardDescription: {
      padding: 20,
    },
    cardTitle: {
      color: colors.light,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '800',
    },
    cartTitle: {
      color: colors.primary,
      fontSize: 16,
      lineHeight: 25,
    },
    registerParagraph: {
      fontSize: 16,
      lineHeight: 25,
      color: '#000',
    },
    checkoutBtn: {
      borderRadius: 25,
      width: 250,
      alignSelf: 'center',
      marginTop: 15,
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    itemCardTitleWrapper: {
      justifyContent: 'space-between',
      backgroundColor: colors.primary,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    th: {
      fontWeight: '800',
    },
    appbar: {
      height: 40,
    },
    couponCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      alignItems: 'center',
    },
    textInput: {
      backgroundColor: '#fff',
      height: 40,
      marginRight: 10,
    },
    codeBtn: {
      borderRadius: 25,
      marginTop: 7,
    },
    cartTh: {
      fontSize: 16,
    },
    carttd: {
      color: colors.primary,
      fontSize: 16,
    },
    cartdiscounttd: {
      color: 'red',
      fontSize: 16,
    },
    planBtn: {
      width: 125,
      borderRadius: 25,
      backgroundColor: colors.secondary,
    },
    emptyView: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: colors.light,
      padding: 20,
    },
    emptyTitle: {
      marginBottom: 25,
      fontSize: 18,
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
    removeCoupon: {
      width: 12,
      height: 12,
      marginTop: -10,
    },
    disableInput: {
      backgroundColor: '#ddd',
    },
    couponErrorText: {
      color: 'red',
      paddingBottom: 5,
      paddingLeft: 15,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const plandata = props.navigation.getParam('plan', null);
    if (plandata === null) {
      setplan(null);
    } else {
      setplan(plandata);
    }
    setIsLoading(false);
  }, [props.navigation]);

  const hideDialog = () => {
    setDialog(false);
  };

  const showDialog = () => {
    setDialog(true);
  };

  const removeItem = () => {
    setplan(null);
    setDialog(false);
  };

  const checkCoupon = () => {
    setCouponError(null);
    setIsLoading(true);
    setDiscount(0);

    var data = {
      code: couponCode,
      product_id: plan.id,
    };

    fetch(`${getCustomApiBase}fetch-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.code === 401) {
          setCouponError(data.message);
          setIsLoading(false);
        }

        if (data.code === 200) {
          setAppliedCouponCode(true);
          setCouponError(null);
          var appliedCode = data['coupon_data']['code'];
          var appliedCodeId = data['coupon_data']['id'];

          var discountAmount = 0;
          var recDiscountAmount = 0;

          switch (data['coupon_data']['discount_type']) {
            case 'sign_up_fee_percent': {
              discountAmount =
                (plan.signUpFee * parseFloat(data['coupon_data']['amount'])) /
                100;
              break;
            }
            case 'sign_up_fee': {
              if (plan.signUpFee < parseFloat(data['coupon_data']['amount'])) {
                discountAmount = plan.signUpFee;
              } else {
                discountAmount = parseFloat(data['coupon_data']['amount']);
              }
              break;
            }
            case 'percent': {
              discountAmount =
                (plan.total_fee * parseFloat(data['coupon_data']['amount'])) /
                100;
              break;
            }
            case 'recurring_fee': {
              if (
                plan.regular_price < parseFloat(data['coupon_data']['amount'])
              ) {
                recDiscountAmount = plan.regular_price;
              } else {
                recDiscountAmount = parseFloat(data['coupon_data']['amount']);
              }
              discountAmount = recDiscountAmount;
              break;
            }
            case 'recurring_percent': {
              recDiscountAmount =
                (plan.regular_price *
                  parseFloat(data['coupon_data']['amount'])) /
                100;
              discountAmount = recDiscountAmount;
              break;
            }
            case 'fixed_cart': {
              if (
                plan.regular_price < parseFloat(data['coupon_data']['amount'])
              ) {
                discountAmount = plan.regular_price;
              } else {
                discountAmount = parseFloat(data['coupon_data']['amount']);
              }
              break;
            }
            case 'fixed_product': {
              if (
                plan.regular_price < parseFloat(data['coupon_data']['amount'])
              ) {
                discountAmount = plan.regular_price;
              } else {
                discountAmount = parseFloat(data['coupon_data']['amount']);
              }
              break;
            }
            default: {
              appliedCode = '';
            }
          }
          setDiscount(discountAmount);
          var couponValues = {
            code: appliedCode,
            amount: discountAmount,
            codeId: appliedCodeId,
            recAmount: recDiscountAmount,
          };
          setCoupondata(couponValues);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setCouponError('Something went wrong');
        setIsLoading(false);
      });
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCouponCode(false);
  };

  const navigateToCheckout = () => {
    var totalPrice =
      parseFloat(plan.signUpFee + plan.regular_price) - parseFloat(discount);
    props.navigation.navigate('CheckOutNavigator', {
      totalPrice: totalPrice,
      plan: plan,
      couponData: coupondata,
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
          {plan === null ? (
            <View style={styles.emptyView}>
              <Title style={styles.emptyTitle}>
                Cart is empty please select any plan
              </Title>
              <Button
                mode="contained"
                style={styles.planBtn}
                onPress={() => props.navigation.navigate('PlansNavigator')}>
                <Text>plan</Text>
              </Button>
            </View>
          ) : (
            <>
              <Appbar style={styles.appbar}>
                <Appbar.Content titleStyle={styles.subheader} title="Cart" />
              </Appbar>
              <ScrollView style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                  <Portal>
                    <Dialog visible={dialog}>
                      <Dialog.Title>
                        Are you sure you remove this item in the cart?
                      </Dialog.Title>
                      <Dialog.Actions>
                        <Button onPress={removeItem}>Remove</Button>
                        <Button onPress={hideDialog}>Cancel</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                  <View style={styles.cartItemCard}>
                    <View style={styles.itemCardTitleWrapper}>
                      <Text style={styles.cardTitle}>{plan.name} </Text>
                      <TouchableOpacity onPress={() => showDialog()}>
                        <Image
                          source={require('../../assets/icons/cross-icon.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardDescription}>
                      <DataTable>
                        <DataTable.Row>
                          <DataTable.Cell>
                            <Subheading>Product</Subheading>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Subheading>{plan.name}</Subheading>
                          </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                          <DataTable.Cell>
                            <Subheading>Quantity</Subheading>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Subheading>1</Subheading>
                          </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                          <DataTable.Cell>
                            <Subheading>Price</Subheading>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Subheading>
                              $ {parseFloat(plan.regular_price).toFixed(2)}
                            </Subheading>
                          </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                          <DataTable.Cell>
                            <Subheading>Signup Fee</Subheading>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Subheading>
                              $ {parseFloat(plan.signUpFee).toFixed(2)}
                            </Subheading>
                          </DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                          <DataTable.Cell>
                            <Subheading>Total</Subheading>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Subheading>
                              ${' '}
                              {parseFloat(
                                plan.signUpFee + plan.regular_price,
                              ).toFixed(2)}
                            </Subheading>
                          </DataTable.Cell>
                        </DataTable.Row>
                      </DataTable>
                    </View>
                  </View>

                  <View style={styles.cartItemCard}>
                    <View style={styles.cardTitleWrapper}>
                      <Text style={styles.cardTitle}>
                        {appliedCouponCode === true
                          ? 'Coupon Code Applied'
                          : 'Do you have Coupon Code?'}
                      </Text>
                    </View>
                    <View style={styles.couponCard}>
                      <View style={{flex: 1}}>
                        <TextInput
                          label="Coupon Code"
                          value={couponCode}
                          onChangeText={text => setCouponCode(text)}
                          mode="outlined"
                          style={[
                            styles.textInput,
                            appliedCouponCode === true
                              ? styles.disableInput
                              : '',
                          ]}
                          editable={appliedCouponCode === true ? false : true}
                        />
                      </View>
                      <View>
                        {appliedCouponCode === true ? (
                          <Button
                            style={styles.codeBtn}
                            mode="contained"
                            onPress={() => removeCoupon()}>
                            <Image
                              source={require('../../assets/icons/cross-icon.png')}
                              style={styles.removeCoupon}
                            />
                          </Button>
                        ) : (
                          <Button
                            style={styles.codeBtn}
                            mode="contained"
                            onPress={() => checkCoupon()}>
                            Apply
                          </Button>
                        )}
                      </View>
                    </View>
                    {couponError === null ? null : (
                      <Text style={styles.couponErrorText}>{couponError}</Text>
                    )}
                  </View>

                  <View style={styles.cartItemCard}>
                    <View style={styles.cardTitleWrapper}>
                      <Text style={styles.cardTitle}>Cart Total</Text>
                    </View>
                    <View style={styles.cardDescription}>
                      <DataTable>
                        <DataTable.Row>
                          <DataTable.Cell>
                            <Title style={styles.cartTh}>Subtotal</Title>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Title style={styles.carttd}>
                              ${' '}
                              {parseFloat(
                                plan.signUpFee + plan.regular_price,
                              ).toFixed(2)}
                            </Title>
                          </DataTable.Cell>
                        </DataTable.Row>
                        {discount <= 0 ? null : (
                          <DataTable.Row>
                            <DataTable.Cell>
                              <Title style={styles.cartTh}>Discount</Title>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              <Title style={styles.cartdiscounttd}>
                                $ {parseFloat(discount).toFixed(2)}
                              </Title>
                            </DataTable.Cell>
                          </DataTable.Row>
                        )}
                        <DataTable.Row>
                          <DataTable.Cell>
                            <Title style={styles.cartTh}>Total</Title>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Title style={styles.carttd}>
                              ${' '}
                              {parseFloat(
                                plan.signUpFee + plan.regular_price - discount,
                              ).toFixed(2)}
                            </Title>
                          </DataTable.Cell>
                        </DataTable.Row>
                      </DataTable>
                      <Button
                        style={styles.checkoutBtn}
                        mode="contained"
                        onPress={() => navigateToCheckout()}>
                        Proceed to Checkout
                      </Button>
                    </View>
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

export default withTheme(Cart);
