/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {REACT_APP_API_URL} from '../EnvKeys';
import axios from 'axios';
import Icon5 from 'react-native-vector-icons/AntDesign';
import DetailMessages from './DetailMessage';

const MessageCard = ({item}) => {
  const [EventDetailsVisible, setEventDetailsVisible] = useState(false);
  return (
    <Pressable onPress={() => setEventDetailsVisible(true)}>
      <View
        style={{
          marginVertical: 2,
          padding: 2,
        }}>
        <Text style={styles.Midtext2UnderLine}>
          {' '}
          <Icon5
            name="mail"
            size={25}
            style={{
              color: 'dodgerblue',
              paddingRight: 20,
            }}
          />
          {'  '}
          {item.title.slice(0, 29)} from -
          {item.sender.fname && item.sender.fname}
        </Text>
        <Modal
          visible={EventDetailsVisible}
          animationType="slide"
          onRequestClose={() => setEventDetailsVisible(false)}>
          <DetailMessages
            data={item}
            setEventDetailsVisible={setEventDetailsVisible}
          />
          <Pressable onPress={() => setEventDetailsVisible(false)}>
            <Icon5
              name="arrowleft"
              size={40}
              style={{
                padding: 10,
              }}
              color="grey"
            />
          </Pressable>
        </Modal>
      </View>
    </Pressable>
  );
};

function SupportMessage({navigation}) {
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };

  const [MessageState, setMessageState] = useState({});
  const CurrentUser = useSelector(state => state.user.currentUser);
  const userData = CurrentUser && CurrentUser.userData;
  const token = CurrentUser && CurrentUser.token;

  const FetchMessages = async id => {
    // setLoading(true)
    console.log('called');
    await axios
      .get(
        `${REACT_APP_API_URL}/users/FetchMessages`,

        {
          headers: {authorization: token},
        },
      )
      .then(res => {
        console.log(res.data);
        setMessageState(res.data.userData);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
        }
        console.log(err);
      });
  };

  const mapMessages = () => {
    return (
      MessageState.length > 0 &&
      MessageState.map(item => {
        return <MessageCard item={item} key={item._id} />;
      })
    );
  };
  React.useEffect(() => {
    FetchMessages();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.Container}>
        <Text style={styles.HeadText2}>Support Messages</Text>
        <View
          style={{
            width: 100 + '%',
            height: 1,
            backgroundColor: 'dodgerblue',
            marginBottom: 10,
          }}
        />
        <View>
          {MessageState.length > 0 ? (
            mapMessages()
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
              No new messages availaible
            </Text>
          )}
        </View>
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
    marginBottom: 20,
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
  Midtext2UnderLine: {
    color: 'grey',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
export default SupportMessage;
