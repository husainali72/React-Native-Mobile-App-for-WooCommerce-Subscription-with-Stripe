import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { NavigationActions } from 'react-navigation';
import { CommonActions, DrawerActions, useNavigation, } from '@react-navigation/native';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { List, Colors, Title, withTheme } from 'react-native-paper';

const styles = {
    container: {
        paddingTop: 0,
        flex: 1,
    },
    navItemStyle: {
        padding: 10,
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey',
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    footerContainer: {
        padding: 10,
        backgroundColor: 'lightgrey',
    },
    headerContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.green700,
    },
    colorWhite: {
        color: Colors.white,
        fontSize: 18,
    },
    menuItem: {
        color: Colors.green700,
        fontSize: 14,
    },
    icons: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
    closemenu: {
        width: 20,
        height: 20,
    },
};
const SideMenu = (props) => {
    const navigation = useNavigation();

    const navigateToScreen = route => () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate(route)
        // navigation.dispatch(
        //     CommonActions.reset({
        //         // index: 1,
        //         routes: [
        //             { name: route }
        //         ],
        //     })
        // );

    };
    const { colors } = props.theme;
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Title style={styles.colorWhite}>Menu</Title>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
                    <View style={{ paddingLeft: 20, paddingVertical: 5, paddingRight: 5 }}>
                        <Image
                            source={require('../assets/icons/menu-close.png')}
                            style={styles.closemenu}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ marginTop: 10 }}>
                <List.Item
                    title="Home"
                    left={props => (
                        <Image
                            source={require('../assets/icons/home-icon.png')}
                            style={styles.icons}
                        />
                    )}
                    onPress={navigateToScreen('Home')}
                    style={styles.menuItem}
                    titleStyle={{ color: colors.primary }}
                />
                <List.Item
                    title="Plans"
                    left={props => (
                        <Image
                            source={require('../assets/icons/plans-icon.png')}
                            style={styles.icons}
                        />
                    )}
                    onPress={navigateToScreen('Plans')}
                    titleStyle={{ color: colors.primary }}
                />
                <List.Item
                    title="Telephonic Behavioral Support"
                    left={props => (
                        <Image
                            source={require('../assets/icons/teleponic-behavioral-icon.png')}
                            style={styles.icons}
                        />
                    )}
                    onPress={navigateToScreen('TelephonicBehavioralSupport')}
                    titleStyle={{ color: colors.primary }}
                    titleNumberOfLines={2}
                />
                <List.Item
                    title="Message"
                    left={props => (
                        <Image
                            source={require('../assets/icons/message-icon.png')}
                            style={styles.icons}
                        />
                    )}
                    onPress={navigateToScreen('Message')}
                    titleStyle={{ color: colors.primary }}
                />
                <List.Item
                    title="About Us"
                    left={props => (
                        <Image
                            source={require('../assets/icons/about-us-icon.png')}
                            style={styles.icons}
                        />
                    )}
                    onPress={navigateToScreen('AboutUs')}
                    titleStyle={{ color: colors.primary }}
                />
                <List.Item
                    title="Contact Us"
                    left={props => (
                        <Image
                            source={require('../assets/icons/contact-icon.png')}
                            style={styles.icons}
                        />
                    )}
                    onPress={navigateToScreen('ContactUs')}
                    titleStyle={{ color: colors.primary }}
                />
                <List.Item
                    title="Portal"
                    left={props => (
                        <Image
                            source={require('../assets/icons/portal-icon.png')}
                            style={styles.icons}
                        />
                    )}
                    onPress={navigateToScreen('Portal')}
                    titleStyle={{ color: colors.primary }}
                />
            </ScrollView>
            <View style={styles.footerContainer}>
                <Text>Everywhere.care</Text>
            </View>
        </View>
    );
}
export default withTheme(SideMenu);
