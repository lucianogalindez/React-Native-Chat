import { HeaderStyleInterpolators } from '@react-navigation/stack'
import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../components/CustomListItem'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase'

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut()
            .then(() => {
                navigation.replace('Login')
            })
    }

    useEffect(() => {
        const unsuscribe = db.collection('chats')
            .onSnapshot(snapshot => 
                setChats(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data() 
                })))
            )

        return unsuscribe

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity 
                        onPress={() => signOutUser()}
                        activeOpacity={0.5}
                    >
                        <Avatar 
                            rounded 
                            source={{uri: auth?.currentUser?.photoURL}} 
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View 
                    style={{
                        marginRight: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 80
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camera' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddChat')} 
                        activeOpacity={0.5}
                    >
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, auth.currentUser])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        })
    }
    
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map(({id, chatName}) => (
                        <CustomListItem 
                            id={id} 
                            chatName={chatName} 
                            key={id}
                            enterChat={enterChat}
                        />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
    
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})