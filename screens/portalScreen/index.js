import React, {useState} from 'react';
import {ScrollView, Dimensions, View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {Appbar, ActivityIndicator, withTheme} from 'react-native-paper';

const Portal = props => {
  const {colors} = props.theme;
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    innerContainer: {
      padding: 15,
    },
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    webview: {
      flex: 1,
      height: Dimensions.get('window').height - 100,
      backgroundColor: '#fff',
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

  return (
    <>
      {isLoading === true ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <Appbar style={styles.appbar}>
            <Appbar.Content
              titleStyle={styles.subheader}
              title="Portal Login"
            />
          </Appbar>
          <ScrollView style={styles.mainContainer}>
            <WebView
              style={styles.webview}
              source={{uri: 'https://google.com/'}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          </ScrollView>
        </>
      )}
    </>
  );
};

export default withTheme(Portal);
