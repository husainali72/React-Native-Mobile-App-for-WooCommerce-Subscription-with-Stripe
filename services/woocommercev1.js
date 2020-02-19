import WooCommerceAPI from 'react-native-woocommerce-api';
import {
  getBaseUrl,
  WooCommerceConsumerKey,
  WooCommerceConsumerSecretKey,
} from './config';

const WCAPIv1 = new WooCommerceAPI({
  url: getBaseUrl, // Your store URL
  ssl: true,
  consumerKey: WooCommerceConsumerKey, // Your consumer secret
  consumerSecret: WooCommerceConsumerSecretKey, // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v1', // WooCommerce WP REST API version
  queryStringAuth: true,
});

export default WCAPIv1;