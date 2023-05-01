import * as yup from 'yup';

const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const zipcodeReg = '^[0-9]{5,10}$';

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .label('First Name')
    .min(4)
    .required(),
  lastname: yup
    .string()
    .label('Last Name')
    .min(2)
    .required(),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirm_password: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
  phone: yup
    .string()
    .matches(phoneReg, 'Phone number is not valid')
    .label('Phone')
    .required(),
  birthdate: yup
    .date()
    .label('Birthdate')
    .required(),
  streetaddress: yup
    .string()
    .label('Street Address')
    .required(),
  city: yup
    .string()
    .label('City')
    .required(),
  zipcode: yup
    .string()
    .matches(zipcodeReg, 'Zipcode is not valid')
    .label('Zip Code')
    .required(),
  country: yup
    .string()
    .label('Country')
    .required(),
  state: yup
    .string()
    .label('State')
    .required(),
});

export default validationSchema;
