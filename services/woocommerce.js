import WooCommerceAPI from 'react-native-woocommerce-api';
import {
  getBaseUrl,
  WooCommerceConsumerKey,
  WooCommerceConsumerSecretKey,
} from './config';

const WCAPI = new WooCommerceAPI({
  url: getBaseUrl, // Your store URL
  ssl: true,
  consumerKey: WooCommerceConsumerKey,
  consumerSecret: WooCommerceConsumerSecretKey,
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v2', // WooCommerce WP REST API version
  queryStringAuth: true,
});

export default WCAPI;
