/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import {REACT_APP_API_URL} from '../EnvKeys';
import axios from 'axios';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {GETMYBOOKINGSUCCESS} from '../redux/action';
import Detailevents from './UserEventDetails';
import {useIsFocused} from '@react-navigation/native';

const BookingCards = props => {
  const {item, token, HandleAcceptOffer} = props;

  const [EventDetailsVisible, setEventDetailsVisible] = useState(false);
  return (
    <View style={{marginVertical: 2, backgroundColor: '#ffffff'}}>
      <Text>request status: {!item.accepted ? 'pending' : 'accepted'}</Text>

      <Text>Address : {item.address}</Text>

      <Text>Mobile : {item.photographerId.mobile}</Text>

      <Text>Date : {item.bookingDate.substring(0, 10)}</Text>

      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button
          // onClick={() =>
          // 	history.push({
          // 		pathname: `${match.url}/events`,
          // 		state: { data: item, token: token },
          // 	})
          // }
          onPress={() => setEventDetailsVisible(true)}>
          View More
        </Button>

        <Modal
          visible={EventDetailsVisible}
          animationType="slide"
          // onRequestClose={() => setRegisterPhotoVisible(false)}
        >
          <Detailevents data={item} />
          <Pressable onPress={() => setEventDetailsVisible(false)}>
            <Icon5
              name="arrowleft"
              size={40}
              style={{padding: 10}}
              color="grey"
            />
          </Pressable>
        </Modal>
      </View>
    </View>
  );
};

function UserBookingHistoryHistory({navigation}) {
  const bookings = useSelector(state => state.bookings);

  const dispatch = useDispatch();
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };
  const CurrentUser = useSelector(state => state.user.currentUser);
  const userData = CurrentUser && CurrentUser.userData;
  const token = CurrentUser && CurrentUser.token;
  const isFocused = useIsFocused();
  const FecthMyBookings = async () => {
    console.log('called');
    await axios
      .get(
        `${REACT_APP_API_URL}/users/getSesssionHistory`,

        {
          headers: {authorization: token},
        },
      )
      .then(res => {
        console.log(res.data);
        // setBookinmgs(res.data.userData)
        dispatch(GETMYBOOKINGSUCCESS(res.data.userData));
        // setIsregistered(true)
        // history.push('/dashboard')
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
          // err.response.data.message &&

          // err.response.data.error && setIsregistered(false)
        }
        console.log(err, 'error');
      });
  };
  const HandleAcceptOffer = async id => {
    await axios
      .get(
        `${REACT_APP_API_URL}/photographer/AcceptOffer?id=${id}`,

        {
          headers: {authorization: token},
        },
      )
      .then(res => {
        console.log(res.data);
        // setBookinmgs(res.data.userData)
        dispatch(GETMYBOOKINGSUCCESS(res.data.userData));
        // setIsregistered(true)
        // history.push('/dashboard')
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
          // err.response.data.message &&

          // err.response.data.error && setIsregistered(false)
        }
        console.log(err);
      });
  };

  useEffect(() => {
    FecthMyBookings();
  }, [isFocused]);

  const MapBookings = () => {
    return (
      bookings.length > 0 &&
      bookings.map(item => {
        return (
          <BookingCards
            key={item._id}
            item={item}
            token={token}
            HandleAcceptOffer={HandleAcceptOffer}
          />
        );
      })
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.Container}>
        <Text style={styles.HeadText2}>My Booking History</Text>
        <View
          style={{
            width: 100 + '%',
            height: 1,
            backgroundColor: 'dodgerblue',
            marginBottom: 10,
            marginTop: 4,
          }}
        />
        <ScrollView style={{backgroundColor: '#f1f0f0'}}>
          {bookings.length > 0 ? (
            MapBookings()
          ) : (
            <Text style={{textAlign: 'center', marginTop: 100}}>
              {' '}
              <Icon5
                name="warning"
                size={25}
                style={{
                  color: 'dodgerblue',
                  paddingRight: 20,
                }}
              />
              {'  '}
              Empty,
            </Text>
          )}
        </ScrollView>
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

const styles = StyleSheet.create({
  HeadText2: {
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
    fontSize: 14,
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
export default UserBookingHistoryHistory;
