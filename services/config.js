//Copy your Wordpress Base URL below
const getBaseUrl = 'https://example.wordpress.com/';

const getApiBase = getBaseUrl + 'wp-json/';

const getCustomApiBase = getApiBase + 'react-native-custom-api/v1/';

//Please refer below link for Stripe Key
//https://stripe.com/docs/keys
const getStripeKey = 'pk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Copy your Stripe Key here

//Please refer below link to obtain One Signal App ID and Rest API Key
//https://documentation.onesignal.com/docs/accounts-and-keys
const oneSignalAppId = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'; // Copy One Signal App ID here
const oneSingalApiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Copy One Signal Rest API Key here

//Please refer below link to obtain Consumer Key and Consumer Secret key from Woocommerce
//https://docs.woocommerce.com/document/woocommerce-rest-api/
const WooCommerceConsumerKey = 'ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Copy Woocomerce Consumer Key here

const WooCommerceConsumerSecretKey = 'cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Copy Woocomerce Consumer Secret Key here

export {
  getBaseUrl,
  getApiBase,
  getCustomApiBase,
  getStripeKey,
  oneSignalAppId,
  oneSingalApiKey,
  WooCommerceConsumerKey,
  WooCommerceConsumerSecretKey,
};
