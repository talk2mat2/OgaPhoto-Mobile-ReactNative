/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, View, Text, StyleSheet, Pressable} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function ProfileSettings({navigation}) {
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };
  const CurrentUser = useSelector(state => state.user.currentUser);
  const userData = CurrentUser && CurrentUser.userData;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.Container}>
        <Text style={styles.HeadText2}>My Profile </Text>
        <View
          style={{
            width: 100 + '%',
            height: 1,
            backgroundColor: 'dodgerblue',
            marginBottom: 10,
            marginTop: 4,
          }}
        />
        <View style={styles.Margin} />
        {/* <View style={styles.Margin} /> */}
        <Icon
          style={{textAlign: 'center'}}
          size={80}
          name="account-circle-outline"
          color="dodgerblue"
        />
        <View style={{height: 2}} />
        <Text style={{...styles.HeadText3}}>
          {userData.fname} {userData.lname}
        </Text>
        <View style={styles.Margin} />

        <Text>
          <Icon5
            name="mobile1"
            size={25}
            style={{
              color: 'dodgerblue',
              paddingRight: 20,
            }}
          />
          {'  '}
          {'  '}
          {userData.mobile}
        </Text>
        <View style={{height: 20}} />
        <Text>
          <Icon5
            name="mail"
            size={25}
            style={{
              color: 'dodgerblue',
              paddingRight: 30,
            }}
          />
          {'  '}
          {'  '}
          {userData.Email}
        </Text>
        <View style={styles.Margin} />
        {/* <Button style={styles.Mybutton2}>
          <Text style={{color: '#ffffff'}}>Update Wallet</Text>
        </Button> */}
      </View>

      <Icon4
        name="menu"
        onPress={handleOpenDrawer}
        size={30}
        style={{
          position: 'absolute',
          color: 'tomato',
          zIndex: 0.5,
          left: 10,
          top: 5,
        }}
      />
    </View>
  );
}
// const styles = StyleSheet.create({
//   HeadText: {
//     color: '#fff',
//     fontSize: 35,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
//   ClientModal: {
//     backgroundColor: 'rgb(71, 178, 228)',
//     flex: 1,
//   },
//   ClientModalInput: {
//     backgroundColor: 'rgb(71, 178, 228)',
//     color: '#ffff',
//     width: 90 + '%',
//     alignSelf: 'center',
//   },

//   Input: {backgroundColor: '#fff', width: 90 + '%', alignSelf: 'center'},
//   BottomText1: {color: 'rgb(71, 178, 228)', fontSize: 15, fontWeight: 'bold'},
//   Mybutton: {
//     backgroundColor: 'rgb(71, 178, 228)',
//     width: 150,
//     alignSelf: 'center',
//     borderRadius: 20,
//     margin: 8,
//   },
//   Mybutton2: {
//     backgroundColor: '#ffff',
//     width: 150,
//     alignSelf: 'center',
//     borderRadius: 20,
//     margin: 8,
//     color: 'rgb(71, 178, 228)',
//     marginTop: 18,
//   },

//   HeadText2: {
//     color: 'black',
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   HeadText3: {
//     color: '#ffff',
//     fontSize: 15,
//     textAlign: 'center',
//     fontWeight: '200',
//   },

//   Container: {
//     flex: 1,
//   },
//   headerContainer: {
//     backgroundColor: 'rgba(255,99,71,0.2)',
//   },

//   HeadTextFoot: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
//   image: {
//     padding: 1,
//     paddingTop: 30,
//     flex: 1,
//     position: 'relative',
//     resizeMode: 'cover',
//     justifyContent: 'flex-start',
//   },
//   UserContainer: {
//     // width: Dimensions.get('window').width / 1.24,
//     width: 100 + '%',
//     height: 100 + '%',
//     paddingLeft: 30,
//     paddingTop: 100,
//     backgroundColor: '#ffff',

//     alignItems: 'flex-start',
//   },
//   footDiv: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });
const styles = StyleSheet.create({
  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  HeadText3: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Container: {
    flex: 1,

    backgroundColor: '#ffffff',
    width: 100 + '%',
    padding: 10,
  },
  MidText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '400',
  },
  Margin: {
    marginVertical: 20,
  },
  Mybutton2: {
    backgroundColor: 'rgb(71, 178, 228)',
    minWidth: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 2,
    color: '#ffffff',
  },
});

export default ProfileSettings;
