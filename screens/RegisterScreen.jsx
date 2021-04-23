import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Image, Input, Button, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://w7.pngwing.com/pngs/104/119/png-transparent-orange-and-white-logo-computer-icons-icon-design-person-person-miscellaneous-logo-silhouette.png'
            })  
        })
        .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container} >
            <StatusBar style='light'/>

            <Text h4 style={{ marginBottom: 50 }}>
                Create a Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Full Name' 
                    autoFocus 
                    type='text'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input 
                    placeholder='Email' 
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
                />
                <Input 
                    placeholder='Profile Picture URL' 
                    type='text'
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button
                containerStyle={styles.button}
                raised
                title='Register'
                onPress={register}
            />

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
