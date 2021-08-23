import React from 'react';
import {View, Button, StyleSheet } from 'react-native';
import { 
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    IconButton,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import userData from '../_data/userProfile.json'
import { useNavigation } from '@react-navigation/native';
import userProfileStack from './userProfileStack';


export function DrawerContents(props, navigation) {
    return (
        <View style={{ flex: 1}}>
            <DrawerContentScrollView  { ...props }>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={ { flexDirection: 'column', marginTop: 20 } }>
                            <Avatar.Image 
                                source={require('../assets/default.png')}
                                size={80}
                            />
                            <View style={{ marginLeft: 7, marginBottom: 1, flexDirection: 'column' }}>
                                <Title style={styles.title}>{userData[0].name}</Title>
                                <Caption style={styles.caption}>{userData[0].email}</Caption>
                            </View>
                        </View>
                        

                    </View>

                </View>

                {/* ---------------------- 👇 Drawer Links 👇  -------------------------- */}

                <Drawer.Section style={styles.drawerSection}>
                          <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="account-circle" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Feather 
                                name="target" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="objectives"
                            onPress={() => {props.navigation.navigate('Objectives')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Feather 
                                name="check" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="key results"
                            onPress={() => {props.navigation.navigate('KeyResult')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome 
                                name="pie-chart" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="dashboards"
                            onPress={() => {props.navigation.navigate('Dashboard')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}} */}
                        {/* /> */}
                    </Drawer.Section>
                    
                     {/* ----------------------👆  Drawer Links 👆 -------------------------- */}


                <Drawer.Section style={styles.bottomDrawerSection}>
                    <Drawer.Item 
                    icon={(color,size) => {
                        return <Ionicons name="ios-exit" size={24} color="#6200ff" />
                    }}
                    label="Log Out ✌️"
                    color={'#6200ff'}
                    onPress={() => {alert(navigation)}} //todo ADD LOGOUT LOGIC!
                    
                    />

                </Drawer.Section>

            </DrawerContentScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      justifyContent: 'space-between'
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      color: '#6200ff',  
      fontSize: 18,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
        paddingLeft: 3,
        fontSize: 10,
        lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });