/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import axios from 'axios';
import {REACT_APP_API_URL} from '../EnvKeys';
import Icon from 'react-native-vector-icons/AntDesign';
import {LOGINSUCCESS} from '../redux/action';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';

const Photograpger = props => {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const {handleSwitch, setRegisterPhotoVisible} = props;
  const [loading, setLoading] = useState(false);
  const Intro = new Animated.ValueXY({
    x: 0,
    y: Dimensions.get('window').height,
  });
  const handleLogin = values => {
    setLoading(true);
    axios
      .post(`${REACT_APP_API_URL}/photographer/Login`, values)
      .then(res => {
        setLoading(false);
        console.log(res.data);
        // setIsregistered(true)
        // history.push('/dashboard')
        dispatch(LOGINSUCCESS(res.data));
      })
      .catch(err => {
        setLoading(false);
        if (err.response) {
          Alert.alert(err.response.data.message);
          console.log(err.response.data.message);
          // err.response.data.message &&

          // err.response.data.error && setIsregistered(false)
        } else {
          Alert.alert('An error occured ,make sure you have a working network');
        }
        console.log(err);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!email || !password) {
      return Alert.alert('Both fields are required');
    }

    handleLogin({email, password});
    // dispatch(signIn(email, password));
    console.log(email, password);
  };

  const BoxAnim = () => {
    Animated.spring(Intro, {
      toValue: {x: 0, y: 0},
      bounciness: 10,
      speed: 7,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  };

  React.useEffect(() => {
    setTimeout(() => {
      BoxAnim();
    }, 1000);
  }, []);
  return (
    <Animated.View
      style={{...styles.AuthContainer, transform: [{translateY: Intro.y}]}}>
      <Text style={styles.HeadText2}>PhotoGrapher Log in</Text>
      <TextInput
        style={styles.Input}
        label="Email"
        value={email}
        onChangeText={text => {
          setemail(text);
        }}
      />
      <TextInput
        style={styles.Input}
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => {
          setpassword(text);
        }}
      />
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
      <Button style={styles.Mybutton} mode="contained" onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#ffffff" style={{height: 90 + '%'}} />
        ) : (
          'LOGIN'
        )}
      </Button>

      <View style={styles.footDiv}>
        <Text onPress={handleSwitch} style={styles.BottomText1}>
          I am a Client ?
        </Text>
        <Text
          onPress={() => setRegisterPhotoVisible(true)}
          style={styles.BottomText1}>
          Register
        </Text>
      </View>
    </Animated.View>
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
    marginTop: 50,
    padding: 10,
    zIndex: 3,
    elevation: 3,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  MidText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default Photograpger;
