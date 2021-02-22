import React ,{Component} from 'react'
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Modal,Alert, ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
export default class WelcomeScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            password:'',
            isModalVisible:'false',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:''
        }
    }
    userSignUp=(emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert("password doesnt match \n check your password")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then((response)=>{
                db.collection('users').add({
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    contact:this.state.contact,
                    email_Id:this.state.emailId,
                    address:this.state.address
                })
                return Alert.alert("USER ADDED SUCCESSFULLY",
                '',
                [
                    {text:'OK',onPress:()=>{
                        this.setState({'isModalVisisble':false})
                    }}
                ])
            })
            .catch(function(error){
                var errorCode=error.code;
                var errorMessage=error.message;
                return Alert.alert(errorMessage)
            })
        }
    }
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
         this.props.navigation.navigate("DonateBooks")
        })
        .catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            return Alert.alert(errorMessage)
        })
    }
    showModal=()=>{
        return(
<Modal animationType="fade"
transparent={true}
visible={this.state.isModalVisible}>
    <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <Text style={styles.modalTitle}>
                    registration
                </Text>
                <TextInput style={styles.formTextInput}
                placeholder={"first name"}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({
                        firstName:text
                    })
                }}/>
                 <TextInput style={styles.formTextInput}
                placeholder={"last name"}
                onChangeText={(text)=>{
                    this.setState({
                        lastName:text
                    })
                }}/>
                 <TextInput style={styles.formTextInput}
                placeholder={"contact"}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                    this.setState({
                       contact:text
                    })
                }}/>
                 <TextInput style={styles.formTextInput}
                placeholder={"address"}
               multiline={true}
                onChangeText={(text)=>{
                    this.setState({
                      address:text
                    })
                }}/>
                 <TextInput style={styles.formTextInput}
                placeholder={"emailId"}
                keyboardType={'email-address'}
                onChangeText={(text)=>{
                    this.setState({
                       emailId:text
                    })
                }}/>
                 <TextInput style={styles.formTextInput}
                placeholder={"password"}
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}/>
                 <TextInput style={styles.formTextInput}
                placeholder={"confirm password"}
               secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        confirmPassword:text
                    })
                }}/>
                <View style={styles.modalBackButton}>
                    <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={()=>{
                        this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                    }}>
                        <Text style={styles.registerButtonText}>
                            register
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalBackButton}>
                    <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={()=>{
                     isModalVisible:false
                    }}>
                        <Text style={{color:'#ff5722'} }>
                           cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    </View>
</Modal>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'}}>

                </View>
                {
                    this.showModal()
                }
                <View style={{justifyContent:'center',alignItems:'center'}}>

                    <Text style={styles.title}>
                        book santa
                    </Text>
                </View>
                <View>
                    <TextInput style={styles.loginBox}
                    placeholder="abc@example.com"
                    keyboardType='email-address'
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}/>
                     <TextInput style={styles.loginBox}
                    placeholder="enterPassword"
                   secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>
                    <TouchableOpacity
                    style={[styles.button,{marginBottom:20,marginTop:20}]}
                    onPress={()=>{
                        this.userLogin(this.state.emailId,this.state.password)
                    }}>
<Text style={styles.buttonText}>
    login
</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                       this.setState({'isModalVisible':true})
                    }}>
<Text style={styles.buttonText}>
   sign up
</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f8be85',
        
    },
    title:{
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color:'#ff3d00'
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:'#ff9800',
        shadowColor:'#00000',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.30,
      shadowRadius:10.32,
       elevation:16
    },
    loginBox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor:'#ff8a65',
        fontSize:20,
        margin:10,
        paddingLeft:10,
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
    },
    buttonContainer:{
        flex:1,
        alignItems:'center'
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalTitle:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffff',
        marginRight:30,
        marginLeft:30,
        marginTop:80,
        marginBottom:80
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        isBorderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    registerButton:{
width:200,
height:40,
justifyContent:'center',
alignItems:'center',
borderWidth:1,
borderRadius:10,
marginTop:30
    },
    registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
    },
    cancelButton:{
        width:200, 
        height:30,
         justifyContent:'center',
          alignItems:'center',
           marginTop:5,
    }
})