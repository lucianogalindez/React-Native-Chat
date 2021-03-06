import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace('Home')
            }
        })

        return unsubscribe
    }, [])
 
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light'/>
            <Image
                source={{
                    uri:
                        "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png"
                }}
                style={{
                    width: 200, height: 200
                }}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Email' 
                    autoFocus 
                    type='email' 
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />

                <Input 
                    placeholder='Password' 
                    secureTextEntry 
                    type='password' 
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button} title='Login' onPress={signIn}/>

            <Button 
                onPress={() => navigation.navigate('Register')} 
                containerStyle={styles.button} title='Register' 
                type='outline'
            />

            <View style={{height: 70}} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10
    }
})

export default LoginScreen
