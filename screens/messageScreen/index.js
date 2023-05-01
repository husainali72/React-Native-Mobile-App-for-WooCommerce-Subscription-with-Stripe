import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {withTheme, Appbar, ActivityIndicator, Button} from 'react-native-paper';
import {oneSignalAppId, oneSingalApiKey} from '../../services/config';

const Message = props => {
  const {colors} = props.theme;
  const [messages, setMessages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    getNotification();
  }, [limit]);

  const htmlToPlaintext = text => {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };

  const getNotification = () => {
    if (limit < 1) {
      setIsLoading(true);
    }
    fetch(
      `https://onesignal.com/api/v1/notifications?app_id=${oneSignalAppId}&limit=${limit}&offset=0`,
      {
        method: 'GET',
        headers: {
          authorization: `Basic ${oneSingalApiKey}`,
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        var notifiactionData = data.notifications;
        setMessages(notifiactionData);
        setIsLoading(false);
        if (data.total_count <= limit) {
          setLoadMore(null);
        } else {
          setLoadMore(true);
        }
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const styles = {
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    innerContainer: {
      padding: 15,
    },
    messageCard: {
      marginTop: 10,
      marginBottom: 10,
      padding: 0,
      backgroundColor: '#EBEBEB',
      borderRadius: 5,
    },
    messageTitleWrapper: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
    },
    messageDescription: {
      padding: 20,
    },
    messageTitle: {color: colors.light, fontSize: 16, textAlign: 'center'},
    subheader: {
      textAlign: 'center',
      fontSize: 16,
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
    registerBtn: {
      borderRadius: 25,
      width: 175,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 25,
    },
  };

  const loadMoreNotification = () => {
    setLoadMore(false);
    var increaseLimit = limit + 5;
    setLimit(increaseLimit);
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
            <Appbar.Content titleStyle={styles.subheader} title="Message" />
          </Appbar>
          <ScrollView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              {messages && messages.length < 0 ? (
                <Text>Message is not Avaialble</Text>
              ) : (
                messages.map((message, index) => (
                  <View key={index} style={styles.messageCard}>
                    <View style={styles.messageTitleWrapper}>
                      <Text style={styles.messageTitle}>
                        {message.headings.en}
                      </Text>
                    </View>
                    <View style={styles.messageDescription}>
                      <Text>{htmlToPlaintext(message.contents.en)}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
            {loadMore === null ? null : loadMore === false ? (
              <ActivityIndicator animating={true} color={colors.primary} />
            ) : (
              <Button
                onPress={loadMoreNotification}
                style={styles.registerBtn}
                mode="contained">
                Load More
              </Button>
            )}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default withTheme(Message);
