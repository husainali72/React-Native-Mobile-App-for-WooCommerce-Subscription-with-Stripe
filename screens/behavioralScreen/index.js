import React from 'react';
import {View, ScrollView, Image, Dimensions} from 'react-native';
import {Title, withTheme, Paragraph, Appbar} from 'react-native-paper';

const Behavioral = props => {
  const {colors} = props.theme;
  const windowWidth = Dimensions.get('window').width;
  const styles = {
    innerContainer: {
      padding: 15,
    },
    mainContainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    behavioralTitle: {
      color: colors.secondary,
      fontSize: 16,
      lineHeight: 25,
      marginBottom: 10,
    },
    behavioralParagraph: {
      fontSize: 16,
      lineHeight: 25,
      color: '#3A3A3A',
      marginBottom: 20,
    },
    iconRow: {
      flexDirection: 'row',
    },
    iconCol: {
      flex: 1,
      padding: 10,
      justifyContent: 'flex-start',
      textAlign: 'center',
      aligItems: 'start',
    },
    iconTitle: {
      fontSize: 12,
      lineHeight: 15,
      textAlign: 'center',
    },
    iconImage: {
      alignSelf: 'center',
    },
    subheader: {
      textAlign: 'center',
      fontSize: 16,
    },
    appbar: {
      height: 40,
    },
    bannerWapper: {
      height: windowWidth < 768 ? 325 : 640,
      marginBottom: 25,
    },
    bannerImage: {
      flex: 1,
      resizeMode: 'cover',
      width: null,
      height: null,
    },
  };
  return (
    <>
      <Appbar style={styles.appbar}>
        <Appbar.Content
          titleStyle={styles.subheader}
          title="Telephonic Behavioral Support"
        />
      </Appbar>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.bannerWapper}>
          <Image
            source={require('../../assets/images/telephonic-behavioral-img.png')}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.innerContainer}>
          <Paragraph style={styles.behavioralParagraph}>
            Most people experience some personal or family distress in the
            course of their lives. Professional assistance helps to ensure
            successful management of personal challenges. Telephonic Counseling
            is a convenient first step in getting such support.
          </Paragraph>
          <Title style={styles.behavioralTitle}>
            Reasons current members use Telephonic Counseling include:
          </Title>
        </View>
        <View style={styles.iconRow}>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Death of a loved one</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Parenting issues</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Major illness</Title>
          </View>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Depression</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Workplace issues</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Financial stress</Title>
          </View>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Relationship issues</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Traumatic accident</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Substance abuse</Title>
          </View>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Stress and anxiety</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>Change & transition</Title>
          </View>
          <View style={styles.iconCol}>
            <Image
              source={require('../../assets/icons/teleponic-counseling-icon.png')}
              style={styles.iconImage}
            />
            <Title style={styles.iconTitle}>
              Any reason that causes concern
            </Title>
          </View>
        </View>

        <View style={{marginBottom: 25}}></View>
      </ScrollView>
    </>
  );
};

export default withTheme(Behavioral);
