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
const Detailevents = ({data}) => {
  const CurrentUser = useSelector(state => state.user.currentUser);
  const userData = CurrentUser && CurrentUser.userData;
  const token = CurrentUser && CurrentUser.token;

  const [BookingDetail, setBookingDetail] = useState({});
  let dispatch = useDispatch();

  let bookings = useSelector(state => state.bookings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bookings.length &&
      bookings.map(items => {
        // console.log(items)
        return items._id === data._id && setBookingDetail(items);
      });
  }, [bookings, data._id]);
  // console.log(data)

  const StartSession = async id => {
    setLoading(true);
    await axios
      .get(
        `${REACT_APP_API_URL}/photographer/StartSession?id=${id}`,

        {
          headers: {authorization: token},
        },
      )
      .then(res => {
        console.log(res.data);
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
  const EndSession = async id => {
    setLoading(true);
    await axios
      .get(
        `${REACT_APP_API_URL}/photographer/EndSession?id=${id}`,

        {
          headers: {authorization: token},
        },
      )
      .then(res => {
        console.log(res.data);
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
  return (
    <View style={styles.Container}>
      {BookingDetail.bookedById && (
        <View>
          <Text style={styles.HeadText2}>Event Details</Text>
          <View
            style={{
              width: 100 + '%',
              height: 1,
              backgroundColor: 'dodgerblue',
              marginBottom: 10,
              marginTop: 4,
            }}
          />

          <View>
            {BookingDetail.address ? (
              <Text style={styles.MidText}>{BookingDetail.address}</Text>
            ) : null}
            <Text style={styles.MidText}>
              Status :{' '}
              {BookingDetail.completed
                ? 'ended'
                : null || BookingDetail.accepted
                ? 'processing'
                : 'pending'}
            </Text>
            <Text style={styles.MidText}>
              photographer name:{' '}
              {BookingDetail.photographerId &&
                BookingDetail.photographerId.fname}
            </Text>

            <Text style={styles.MidText}>
              price per min: NGN {BookingDetail.pricePerMinutes}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.Margin} />
      <View style={styles.ButtonContainer}></View>
      <View style={styles.Margin} />
      {BookingDetail.sessionDuration || BookingDetail.sessionDuration > -1 ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <>
            <Text>completed</Text>
            {/* <QueryBuilderIcon style={{ color: '#25D366', fontSize: '40px' }} /> */}
            <Icon5 size={50} color="#25D366" name="clockcircleo" />
          </>

          <Text>total duration :{BookingDetail.sessionDuration} minutes !</Text>
          <Text>
            Total Price :NGN
            {BookingDetail.sessionDuration * BookingDetail.pricePerMinutes} :
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
  },
  C: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff',
    width: 100 + '%',
    padding: 10,
  },
  Container: {paddingTop: 20, padding: 10},
  MidText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '800',
  },
  Margin: {
    marginVertical: 20,
  },
  ButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
export default Detailevents;
