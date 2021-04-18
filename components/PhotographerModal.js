/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {LOGINSUCCESS} from '../redux/action';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
const PhotographerModal = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mobile, setMobile] = useState('');
  const [confpass, setConfPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [mylocation, setMylocation] = useState(null);
  const proxyUrl = 'https://mighty-hamlet-65743.herokuapp.com';
  const dispatch = useDispatch();
  const option = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  useEffect(() => {
    if ('geolocation' in navigator) {
      if (mylocation === null) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setMylocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            // alert(position.coords.latitude)
          },
          err => console.log(err),
          option,
        );
      }
    } else {
      console.log('location Not Available');
    }
  }, []);

  // process.env.REACT_APP_API_URL
  const handleSignup = values => {
    setLoading(true);
    axios
      .post(`${proxyUrl}/photographer/Register`, values)
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

    if (!email || !password || !fname || !lname || !mobile) {
      return Alert.alert('Error, all fields are required');
    }
    if (password !== confpass) {
      return Alert.alert('Both password dont match');
    }
    //  updateMyLocation
    // dispatch(signUp(email, password, mobile, fname, lname));handle
    if (mylocation) {
      handleSignup({
        email,
        password,
        fname,
        lname,
        mobile,
        lat: mylocation.lat,
        lng: mylocation.lng,
      });
    } else {
      handleSignup({email, password, fname, lname, mobile});
    }
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
      style={{...styles.PhotgrapherModal}}>
      <ScrollView style={{flex: 1}}>
        <Pressable onPress={() => props.setRegisterVisible(false)}>
          <Icon name="arrowleft" size={40} style={{padding: 10}} />
          <Text style={{...styles.HeadText2}}>I am a photographer</Text>
          <Text style={styles.HeadText3}>and I'm looking for assignments</Text>
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
            underlineColor="grey"
            theme={{colors: {text: 'grey', placeholder: 'grey'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Last Name"
            value={lname}
            onChangeText={text => {
              setLname(text);
            }}
            underlineColor="grey"
            theme={{colors: {text: 'grey', placeholder: 'grey'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Phone Number"
            value={mobile}
            onChangeText={text => {
              setMobile(text);
            }}
            underlineColor="grey"
            theme={{colors: {text: 'grey', placeholder: 'grey'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            underlineColor="grey"
            theme={{colors: {text: 'grey', placeholder: 'grey'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            underlineColor="grey"
            theme={{colors: {text: 'grey', placeholder: 'grey'}}}
          />

          <TextInput
            style={styles.ClientModalInput}
            label="Confirm Password"
            value={confpass}
            onChangeText={text => {
              setConfPassword(text);
            }}
            underlineColor="grey"
            theme={{colors: {text: 'grey', placeholder: 'grey'}}}
          />
        </Pressable>
        <Button onPress={handleSubmit} style={styles.Mybutton}>
          <Text style={{color: '#ffffff'}}>
            {loading ? 'loading' : ' SIGNUP'}
          </Text>
        </Button>
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
  PhotgrapherModal: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  ClientModalInput: {
    backgroundColor: '#ffff',
    color: 'rgb(71, 178, 228)',
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
    color: '#ffff',
    marginTop: 19,
  },
  Mybutton2: {
    backgroundColor: 'rgb(71, 178, 228)',
    width: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 8,
    color: '#ffff',
    marginTop: 19,
  },

  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  HeadText3: {
    color: 'grey',
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
});

export default PhotographerModal;
