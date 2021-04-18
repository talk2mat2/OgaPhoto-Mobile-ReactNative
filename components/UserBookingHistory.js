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

const BookingCards = props => {
  const {item, token, HandleAcceptOffer} = props;
  const [EventDetailsVisible, setEventDetailsVisible] = useState(false);
  return (
    <View
    // style={{ cursor: 'pointer' }}
    >
      <Text>Booked by: {item.bookedById.fname}</Text>

      <Text>Date : {item.bookingDate.substring(0, 10)}</Text>

      <Text>Email : {item.bookedById.Email}</Text>

      <Text>Mobile : {item.bookedById.mobile}</Text>

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
  const FecthMyBookings = async () => {
    await axios
      .get(
        `${REACT_APP_API_URL}/photographer/FectMyBookings`,

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
  }, []);

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
        <Text style={styles.HeadText2}>Session History</Text>
        <ScrollView>{MapBookings()}</ScrollView>
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
          top: 20,
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
    marginTop: 20,
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
export default UserBookingHistoryHistory;
