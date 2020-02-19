import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Picker,
  Platform,
  Dimensions,
} from 'react-native';
import {
  withTheme,
  TextInput,
  Button,
  RadioButton,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import * as yup from 'yup';
import {Formik} from 'formik';
import validationSchema from './valdiationSchema';
import initialFormValues from './initialFormValue';

const CheckOut = props => {
  const {colors} = props.theme;
  const windowWidth = Dimensions.get('window').width;
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState(true);
  const [coupondata, setCoupondata] = useState(null);
  const [value, setValue] = useState({
    firstname: '',
    lastname: '',
    email: '',
    streetaddress: '',
    city: '',
    zipcode: '',
    phone: '',
    country: '',
    birthdate: '',
    password: '',
    gender: 'female',
    preferredLanguage: 'english',
    states: [
      {value: 'AL', label: 'Alabama', key: 'AL'},
      {value: 'AK', label: 'Alaska', key: 'AK'},
      {value: 'AZ', label: 'Arizona', key: 'AZ'},
      {value: 'AR', label: 'Arkansas', key: 'AR'},
      {value: 'CA', label: 'California', key: 'CA'},
      {value: 'CO', label: 'Colorado', key: 'CO'},
      {value: 'CT', label: 'Connecticut', key: 'CT'},
      {value: 'DE', label: 'Delaware', key: 'DE'},
      {value: 'DC', label: 'District Of Columbia', key: 'DC'},
      {value: 'FL', label: 'Florida', key: 'FL'},
      {value: 'GA', label: 'Georgia', key: 'GA'},
      {value: 'HI', label: 'Hawaii', key: 'HI'},
      {value: 'ID', label: 'Idaho', key: 'ID'},
      {value: 'IL', label: 'Illinois', key: 'IL'},
      {value: 'IN', label: 'Indiana', key: 'IN'},
      {value: 'IA', label: 'Iowa', key: 'IA'},
      {value: 'KS', label: 'Kansas', key: 'KS'},
      {value: 'KY', label: 'Kentucky', key: 'KY'},
      {value: 'LA', label: 'Louisiana', key: 'LA'},
      {value: 'ME', label: 'Maine', key: 'ME'},
      {value: 'MD', label: 'Maryland', key: 'MD'},
      {value: 'MA', label: 'Massachusetts', key: 'MA'},
      {value: 'MI', label: 'Michigan', key: 'MI'},
      {value: 'MN', label: 'Minnesota', key: 'MN'},
      {value: 'MS', label: 'Mississippi', key: 'MS'},
      {value: 'MO', label: 'Missouri', key: 'MO'},
      {value: 'MT', label: 'Montana', key: 'MT'},
      {value: 'NE', label: 'Nebraska', key: 'NE'},
      {value: 'NV', label: 'Nevada', key: 'NV'},
      {value: 'NH', label: 'New Hampshire', key: 'NH'},
      {value: 'NJ', label: 'New Jersey', key: 'NJ'},
      {value: 'NM', label: 'New Mexico', key: 'NM'},
      {value: 'NY', label: 'New York', key: 'NY'},
      {value: 'NC', label: 'North Carolina', key: 'NC'},
      {value: 'ND', label: 'North Dakota', key: 'ND'},
      {value: 'OH', label: 'Ohio', key: 'OH'},
      {value: 'OK', label: 'Oklahoma', key: 'OK'},
      {value: 'OR', label: 'Oregon', key: 'OR'},
      {value: 'PA', label: 'Pennsylvania', key: 'PA'},
      {value: 'RI', label: 'Rhode Island', key: 'RI'},
      {value: 'SC', label: 'South Carolina', key: 'SC'},
      {value: 'SD', label: 'South Dakota', key: 'SD'},
      {value: 'TN', label: 'Tennessee', key: 'TN'},
      {value: 'TX', label: 'Texas', key: 'TX'},
      {value: 'UT', label: 'Utah', key: 'UT'},
      {value: 'VT', label: 'Vermont', key: 'VT'},
      {value: 'VA', label: 'Virginia', key: 'VA'},
      {value: 'WA', label: 'Washington', key: 'WA'},
      {value: 'WV', label: 'West Virginia', key: 'WV'},
      {value: 'WI', label: 'Wisconsin', key: 'WI'},
      {value: 'WY', label: 'Wyoming', key: 'WY'},
      {value: 'AA', label: 'Armed Forces (AA)', key: 'AA'},
      {value: 'AE', label: 'Armed Forces (AE)', key: 'AE'},
      {value: 'AP', label: 'Armed Forces (AP)', key: 'AP'},
    ],
    state: '',
  });

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
    submitBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 40,
    },
    textInput: {
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: '#fff',
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mt3: {
      marginTop: 10,
      marginBottom: 10,
    },
    appbar: {
      height: 40,
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
    androidInput: {
      borderWidth: 1,
      borderColor: 'grey',
      marginTop: 5,
      marginBottom: 5,
    },
    iosInput: {
      borderWidth: 1,
      borderColor: 'grey',
      marginTop: 5,
      marginBottom: 5,
      paddingVertical: 20,
      paddingHorizontal: 10,
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
    price: {
      position: 'absolute',
      top: 11,
      right: 5,
      color: '#fff',
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
    errorInput: {
      borderColor: '#b00020',
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const totalPriceval = props.navigation.getParam('totalPrice', 0);
    const plandata = props.navigation.getParam('plan', '');
    const couponData = props.navigation.getParam('couponData', '');
    setCoupondata(couponData);
    setTotalPrice(totalPriceval);
    setPlan(plandata);
    setIsLoading(false);
    console.log('couponData', couponData);
  }, [props.navigation]);

  const submit = val => {
    props.navigation.navigate('BillingNavigator', {
      cstmrInfo: val,
      planData: plan,
      totalPriceData: totalPrice,
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
          <View style={styles.customAppBar}>
            <Text style={styles.appbarheading}>Checkout </Text>
            <Text style={styles.appbarprice}>
              $ {parseFloat(totalPrice).toFixed(2)} {'   '}
            </Text>
          </View>
          <ScrollView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <Formik
                initialValues={initialFormValues}
                onSubmit={values => submit(values)}
                validationSchema={validationSchema}>
                {({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  isValid,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <>
                    <TextInput
                      style={styles.textInput}
                      label="First Name"
                      mode="outlined"
                      value={values.firstname}
                      onChangeText={handleChange('firstname')}
                      onBlur={() => setFieldTouched('firstname')}
                      error={
                        touched.firstname && errors.firstname ? true : false
                      }
                    />
                    {touched.firstname && errors.firstname && (
                      <HelperText type="error">{errors.firstname}</HelperText>
                    )}

                    <TextInput
                      style={styles.textInput}
                      label="Last Name"
                      mode="outlined"
                      value={values.lastname}
                      onChangeText={handleChange('lastname')}
                      onBlur={() => setFieldTouched('lastname')}
                      error={touched.lastname && errors.lastname ? true : false}
                    />
                    {touched.lastname && errors.lastname && (
                      <HelperText type="error">{errors.lastname}</HelperText>
                    )}

                    <TextInput
                      style={styles.textInput}
                      label="Email"
                      mode="outlined"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      error={touched.email && errors.email ? true : false}
                    />
                    {touched.email && errors.email && (
                      <HelperText type="error">{errors.email}</HelperText>
                    )}

                    <TextInput
                      style={styles.textInput}
                      label="Password"
                      mode="outlined"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      error={touched.password && errors.password ? true : false}
                      secureTextEntry={true}
                    />
                    {touched.password && errors.password && (
                      <HelperText type="error">{errors.password}</HelperText>
                    )}

                    <TextInput
                      style={styles.textInput}
                      label="Confirm Password"
                      mode="outlined"
                      value={values.confirm_password}
                      onChangeText={handleChange('confirm_password')}
                      onBlur={() => setFieldTouched('confirm_password')}
                      error={
                        touched.confirm_password && errors.confirm_password
                          ? true
                          : false
                      }
                      secureTextEntry={true}
                    />
                    {touched.confirm_password && errors.confirm_password && (
                      <HelperText type="error">
                        {errors.confirm_password}
                      </HelperText>
                    )}

                    <TextInput
                      style={styles.textInput}
                      label="Phone"
                      mode="outlined"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={() => setFieldTouched('phone')}
                      error={touched.phone && errors.phone ? true : false}
                      keyboardType={'number-pad'}
                      returnKeyType="done"
                    />
                    {touched.phone && errors.phone && (
                      <HelperText type="error">{errors.phone}</HelperText>
                    )}

                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: errors.birthdate ? '#b00020' : 'grey',
                        marginTop: 5,
                      }}>
                      <DatePicker
                        style={{width: 275, height: 55}}
                        date={values.birthdate}
                        mode="date"
                        placeholder="Birthdate "
                        format="YYYY-MM-DD"
                        minDate="1950-05-01"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 4,
                            top: 13,
                            marginLeft: 0,
                          },
                          dateInput: {
                            marginLeft: 50,
                            border: 'none',
                            flex: 1,
                            width: 275,
                            borderWidth: 0,
                            marginTop: 15,
                            alignItems: 'flex-start',
                          },
                          placeholderText: {
                            color: errors.birthdate ? '#b00020' : 'grey',
                            fontSize: 16,
                          },
                          dateText: {
                            width: 275,
                          },
                        }}
                        onDateChange={date => setFieldValue('birthdate', date)}
                      />
                    </View>
                    {touched.birthdate && errors.birthdate && (
                      <HelperText type="error">{errors.birthdate}</HelperText>
                    )}

                    <View style={styles.mt3}>
                      <Text>Gender</Text>
                      <RadioButton.Group
                        onValueChange={getVal =>
                          setValue({...value, gender: getVal})
                        }
                        value={value.gender}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <RadioButton
                              value="male"
                              status={
                                value.gender === 'male'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                            <Text
                              onPress={() =>
                                setValue({...value, gender: 'male'})
                              }>
                              Male{' '}
                            </Text>
                          </View>
                          <View style={styles.row}>
                            <RadioButton
                              value="female"
                              status={
                                value.gender === 'female'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                            <Text
                              onPress={() =>
                                setValue({...value, gender: 'female'})
                              }>
                              Female{' '}
                            </Text>
                          </View>
                        </View>
                      </RadioButton.Group>
                    </View>

                    <View style={styles.mt3}>
                      <Text>Preferred Language</Text>
                      <RadioButton.Group
                        onValueChange={getVal =>
                          setValue({...value, preferredLanguage: getVal})
                        }
                        value={value.preferredLanguage}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <RadioButton
                              value="english"
                              status={
                                value.preferredLanguage === 'english'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                            <Text
                              onPress={() =>
                                setValue({
                                  ...value,
                                  preferredLanguage: 'english',
                                })
                              }>
                              English{' '}
                            </Text>
                          </View>
                          <View style={styles.row}>
                            <RadioButton
                              value="spanish"
                              status={
                                value.preferredLanguage === 'spanish'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                            <Text
                              onPress={() =>
                                setValue({
                                  ...value,
                                  preferredLanguage: 'spanish',
                                })
                              }>
                              Spanish{' '}
                            </Text>
                          </View>
                        </View>
                      </RadioButton.Group>
                    </View>

                    <TextInput
                      style={styles.textInput}
                      label="Street Address"
                      mode="outlined"
                      value={values.streetaddress}
                      onChangeText={handleChange('streetaddress')}
                      onBlur={() => setFieldTouched('streetaddress')}
                      error={
                        touched.streetaddress && errors.streetaddress
                          ? true
                          : false
                      }
                    />
                    {touched.streetaddress && errors.streetaddress && (
                      <HelperText type="error">
                        {errors.streetaddress}
                      </HelperText>
                    )}

                    <TextInput
                      style={styles.textInput}
                      label="Country"
                      mode="outlined"
                      value={values.country}
                      editable={false}
                    />

                    <TextInput
                      style={styles.textInput}
                      label="Town / City"
                      mode="outlined"
                      value={values.city}
                      onChangeText={handleChange('city')}
                      onBlur={() => setFieldTouched('city')}
                      error={touched.city && errors.city ? true : false}
                    />
                    {touched.city && errors.city && (
                      <HelperText type="error">{errors.city}</HelperText>
                    )}

                    {Platform.OS === 'ios' ? (
                      <>
                        <View
                          style={[
                            styles.iosInput,
                            errors.state && styles.errorInput,
                          ]}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Select State',
                              value: null,
                              color: errors.state ? '#b00020' : 'grey',
                            }}
                            onValueChange={value =>
                              setFieldValue('state', value)
                            }
                            items={value.states}
                            useNativeAndroidPickerStyle={false}
                            style={{
                              placeholder: {
                                color: errors.state ? '#b00020' : 'grey',
                                fontSize: 16,
                              },
                              inputIOSContainer: {
                                fontSize: 16,
                              },
                            }}
                          />
                        </View>
                        {touched.state && errors.state && (
                          <HelperText type="error">
                            Please Select State
                          </HelperText>
                        )}
                      </>
                    ) : null}

                    {Platform.OS === 'android' ? (
                      <>
                        <View
                          style={[
                            styles.androidInput,
                            errors.state && styles.errorInput,
                          ]}>
                          <Picker
                            selectedValue={values.state}
                            style={{height: 50, flex: 1}}
                            onValueChange={(itemValue, itemIndex) =>
                              itemValue !== '0' &&
                              // setValue({...value, state: itemValue})
                              setFieldValue('state', itemValue)
                            }>
                            <Picker.Item
                              label="Select State"
                              value="0"
                              color={errors.state ? '#b00020' : 'grey'}
                            />
                            {value.states.map((state, index) => (
                              <Picker.Item
                                label={state.label}
                                value={state.value}
                                key={index}
                              />
                            ))}
                          </Picker>
                        </View>
                        {touched.state && errors.state && (
                          <HelperText type="error">
                            Please Select State
                          </HelperText>
                        )}
                      </>
                    ) : null}

                    <TextInput
                      style={styles.textInput}
                      label="Zip Code"
                      mode="outlined"
                      value={values.zipcode}
                      onChangeText={handleChange('zipcode')}
                      onBlur={() => setFieldTouched('zipcode')}
                      error={touched.zipcode && errors.zipcode ? true : false}
                      keyboardType={'number-pad'}
                      returnKeyType="done"
                    />
                    {touched.zipcode && errors.zipcode && (
                      <HelperText type="error">{errors.zipcode}</HelperText>
                    )}

                    <Button
                      style={styles.submitBtn}
                      mode="contained"
                      disabled={!isValid}
                      onPress={handleSubmit}>
                      Billing Process
                    </Button>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default withTheme(CheckOut);
