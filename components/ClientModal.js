/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {REACT_APP_API_URL} from '../EnvKeys';
import {LOGINSUCCESS} from '../redux/action';
import axios from 'axios';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Dimensions,
  Pressable,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
const ClentModal = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mobile, setMobile] = useState('');
  const [confpass, setConfPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  // process.env.REACT_APP_API_URL
  const handleSignup = values => {
    setLoading(true);

    axios
      .post(`${REACT_APP_API_URL}/users/Register`, values)
      .then(res => {
        setLoading(false);
        console.log(res.data);
        // history.push("/dashboard");
        dispatch(LOGINSUCCESS(res.data));
      })
      .catch(err => {
        setLoading(false);
        if (err.response) {
          console.log(err.response.data.message);
          err.response.data.message &&
            setErrorMessage(err.response.data.message);
        }
        console.log(err);
        setErrorMessage(
          'An error occured ,make sure you have a working network',
        );
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confpass) {
      return Alert.alert('Both password dont match');
      //   return setErrorMessage('Both password dont match');
    }
    if (!email || !password || !fname || !lname || !mobile) {
      return Alert.alert('Error, all fields are required');
    }
    // dispatch(signUp(email, password, mobile, fname, lname));handle
    handleSignup({email, password, fname, lname, mobile});
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setConfPassword('');
    setFname('');
    setLname('');
    setMobile('');
    // dispatch(clearSignupError());
    setErrorMessage('');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{...styles.ClientModal}}>
      <ScrollView style={{flex: 1}}>
        {/* <View style={styles.ClientModal}> */}
        <Pressable onPress={() => props.setRegisterVisible(false)}>
          <Icon name="arrowleft" size={40} style={{padding: 10}} />
          <Text style={{...styles.HeadText2, color: 'white'}}>
            I am a client
          </Text>
          <Text style={styles.HeadText3}>and I want to order a shoot</Text>
          <TextInput
            style={styles.ClientModalInput}
            label="First Name"
            //   autoComplete="off"
            //   onChange={handleFnameChange}
            //   value={fname}
            //   type="text"
            //   required
            value={fname}
            onChangeText={text => {
              setFname(text);
            }}
            underlineColor="#ffff"
            theme={{colors: {text: '#ffff', placeholder: '#ffff'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Last Name"
            value={lname}
            onChangeText={text => {
              setLname(text);
            }}
            underlineColor="#ffff"
            theme={{colors: {text: '#ffff', placeholder: '#ffff'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Phone Number"
            value={mobile}
            onChangeText={text => {
              setMobile(text);
            }}
            underlineColor="#ffff"
            theme={{colors: {text: '#ffff', placeholder: '#ffff'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            underlineColor="#ffff"
            theme={{colors: {text: '#ffff', placeholder: '#ffff'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={text => {
              setPassword(text);
            }}
            underlineColor="#ffff"
            theme={{colors: {text: '#ffff', placeholder: '#ffff'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Confirm Password"
            value={confpass}
            secureTextEntry={true}
            onChangeText={text => {
              setConfPassword(text);
            }}
            underlineColor="#ffff"
            theme={{colors: {text: '#ffff', placeholder: '#ffff'}}}
          />
        </Pressable>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator
              style={{alignSelf: 'center'}}
              size="large"
              color="dodgerblue"
            />
            <Text style={styles.MidText}>loading...</Text>
          </View>
        ) : null}
        <Button onPress={handleSubmit} style={styles.Mybutton2}>
          {loading ? 'loading' : ' SIGNUP'}
        </Button>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  HeadText: {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  ClientModal: {
    backgroundColor: 'rgb(71, 178, 228)',
    flex: 1,
    // justifyContent: 'flex-end',
  },
  ClientModalInput: {
    backgroundColor: 'rgb(71, 178, 228)',
    color: '#ffff',
    width: 90 + '%',
    alignSelf: 'center',
  },

  Input: {backgroundColor: '#fff', width: 90 + '%', alignSelf: 'center'},
  BottomText1: {color: 'rgb(71, 178, 228)', fontSize: 15, fontWeight: 'bold'},
  Mybutton: {
    backgroundColor: 'rgb(71, 178, 228)',
    width: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 8,
  },
  Mybutton2: {
    backgroundColor: '#ffff',
    width: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 8,
    color: 'rgb(71, 178, 228)',
    marginTop: 18,
  },

  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  HeadText3: {
    color: '#ffff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '200',
  },

  Container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'rgba(255,99,71,0.2)',
  },

  HeadTextFoot: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  image: {
    padding: 1,
    paddingTop: 30,
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  AuthContainer: {
    width: Dimensions.get('window').width / 1.24,
    minHeight: 200,
    backgroundColor: '#ffff',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 4,
    bottom: 30,
    padding: 10,
    zIndex: 8,
  },
  footDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loading: {
    position: 'absolute',
    minHeight: 50,
    width: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 100,
    padding: 10,
    zIndex: 3,
    elevation: 3,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  MidText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default ClentModal;
