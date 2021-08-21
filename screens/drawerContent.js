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
import { Ionicons } from '@expo/vector-icons';
import userData from '../_data/userProfile.json'

export function DrawerContents(props) {
    return (
        <View style={{ flex: 1}}>
            <DrawerContentScrollView  { ...props }>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={ { flexDirection: 'row', marginTop: 20 } }>
                            <Avatar.Image 
                                source={require('../assets/avatar-person.jpeg')}
                                size={50}
                            />
                            <View style={{ marginLeft: 7, marginBottom: 5, flexDirection: 'column' }}>
                                <Title style={styles.title}>{userData[0].name}</Title>
                                <Caption style={styles.caption}>{userData[0].email}</Caption>
                            </View>
                        </View>
                        

                    </View>

                </View>

                <Drawer.Section style={styles.bottomDrawerSection}>
                    <Drawer.Item 
                    icon={(color,size) => {
                        return <Ionicons name="ios-exit" size={24} color="#6200ff" />
                    }}
                    label="Log Out ✌️"
                    color={'#6200ff'}
                    onPress={() => {}} //todo ADD LOGOUT LOGIC!
                    
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