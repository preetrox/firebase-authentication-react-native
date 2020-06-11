import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity ,Modal,ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth'

export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            visible:false
        }
    }

     
   signUp=()=>{
    if(this.state.email===''){
        return alert('email should not be empty')
        }
        else if(this.state.password===''){
           return alert('password should not be empty')
        }

        else if(this.state.confirmpassword===''){
            return alert('confirm password should not be empty')
        }

        else if(this.state.confimpassword===this.state.password){
            return alert('passwords does not match')
        }
        this.setState({visible:true});
        auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
            this.setState({visible:false});
            
            this.props.navigation.navigate('Login')

        }).catch(error=>{
            if (error.code === 'auth/email-already-in-use') {
              alert('That email address is already in use!');
              this.setState({visible:false});

            }
          
              if (error.code === 'auth/invalid-email') {
                this.setState({visible:false});

                alert('That email address is invalid!');
              }
          
        });
    }

    render() {
        let { email, password, confirmPassword } = this.state;
        return (
            <View style={styles.container}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.visible}
                  >
                    <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size={50} color="#fff" />
                    </View>
                    </Modal>
                <ScrollView style={{ flex: 1, padding: 20 }}>
                    {/* header started */}
                    <View style={styles.header}>
                        <View style={styles.headerButtonContainer}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                                <Text>
                                    Sign In
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerButtonContainer}>
                            <TouchableOpacity>
                                <Text style={styles.headerText}>
                                    Sign Up
                            </Text>
                            </TouchableOpacity>
                            <View style={styles.headerBottomLine} />
                        </View>
                    </View>
                    {/* header ended */}

                    {/* welcome back text started */}
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>
                            Hello <Text style={{ fontWeight: 'bold' }}>Beautiful</Text>,
                        </Text>
                        <Text>
                            Enter your information below or login a email and password
                        </Text>
                    </View>
                    {/* welcome container edned */}

                    {/* input container started */}

                    <View style={styles.inputContainer}>
                        <TextInput
                            label='Email'
                            value={email}
                            onChangeText={email => this.setState({ email })}
                            style={{ marginTop: 10 }}
                        />
                        <TextInput
                            label='Password'
                            value={password}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry
                            style={{ marginTop: 10 }}
                        />
                        <TextInput
                            label='Confirm Password'
                            value={confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry
                            style={{ marginTop: 10 }}
                        />
                        <TouchableOpacity style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>Already have account?</Text>
                        </TouchableOpacity>
                    </View>
                    {/* input container ended */}


                </ScrollView>
                {/* bottom container with next button started */}
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomBarContainer} />
                    <TouchableOpacity style={styles.bottomButtonContainer} onPress={()=>this.signUp()}> 
                        {/* <View style={styles.bottomButtonContainer}> */}
                        <Feather
                            name="arrow-right"
                            style={{ fontSize: 18, color: '#fff' }}
                        />
                        {/* </View> */}
                    </TouchableOpacity>
                </View>
                {/* bottom container with next button edned */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    headerBottomLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#444',
        marginTop: 5
    },
    headerButtonContainer: {
        paddingLeft: 30
    },
    headerText: {
        fontWeight: 'bold'
    },
    welcomeContainer: {
        paddingTop: 30
    },
    welcomeText: {
        fontSize: 30,
    },
    inputContainer: {
        paddingTop: 30
    },
    bottomContainer: {
        position: 'absolute',
        height: 100,
        width: '100%',
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'flex-end'
    },
    forgotPasswordContainer: {
        marginTop: 10,
    },
    forgotPasswordText: {
        fontWeight: 'bold'
    },
    bottomBarContainer: {
        height: 70,
        width: '100%',
        backgroundColor: '#ccc'
    },
    bottomButtonContainer: {
        height: 40,
        width: 40,
        backgroundColor: 'rgb(217, 150, 177)',
        position: 'absolute',
        right: 30,
        top: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
