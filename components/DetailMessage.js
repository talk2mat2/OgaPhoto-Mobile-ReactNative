/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DetailMessages = ({data}) => {
  const [message, setMessage] = useState();

  useEffect(() => {
    data && setMessage(data);
    console.log('called');
  }, []);
  return (
    <View style={styles.Container}>
      {message ? (
        <>
          <View style={styles.Mainbar}>
            <Text style={styles.HeadText2}>{message.title}</Text>
          </View>
          <View
            style={{
              width: 100 + '%',
              height: 1,
              backgroundColor: 'dodgerblue',
              marginBottom: 6,
              marginTop: 1,
            }}
          />
          <View style={styles.Mainbar}>
            <Text style={styles.MidText}>
              From - {message.sender.fname && message.sender.fname}
            </Text>
          </View>
          <View style={styles.Margin} />
          <View style={styles.MainBody}>
            <Text style={styles.MidText}>{message.body}</Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  Mainbar: {width: 100 + '%', backgroundColor: '#ffffff', padding: 10},
  Container: {
    flex: 1,

    backgroundColor: '#f1f0f0',
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
    marginVertical: 3,
  },
  Mybutton2: {
    backgroundColor: 'rgb(71, 178, 228)',
    minWidth: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 2,
    color: '#ffffff',
  },
  MainBody: {
    minHeight: 200,
    flex: 1,
    width: 100 + '%',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  Midtext2UnderLine: {
    color: 'grey',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default DetailMessages;
