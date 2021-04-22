/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import Swiper from 'react-native-swiper';
const image1 = require('../assets/camera.jpg');
const image2 = require('../assets/2.jpg');
const image3 = require('../assets/3.jpg');

const image5 = require('../assets/6.jpg');

export default function Swipper() {
  return (
    <View style={styles.container}>
      <Swiper
        autoplayTimeout={16}
        showsPagination={false}
        showsButtons={false}
        autoplay={true}
        loop={true}>
        <View style={styles.sliderImage}>
          <Image
            resizeMode="contain"
            style={{height: 100 + '%', width: 100 + '%'}}
            source={image1}
          />
        </View>
        <View style={styles.sliderImage}>
          <Image
            resizeMode="contain"
            style={{height: 175, width: 400}}
            source={image2}
          />
        </View>
        <View style={styles.sliderImage}>
          <Image
            resizeMode="contain"
            style={{height: 175, width: 400}}
            source={image3}
          />
        </View>
        <View style={styles.sliderImage}>
          <Image
            resizeMode="contain"
            style={{height: 175, width: 400}}
            source={image5}
          />
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: '#fff',
  },
  sliderImage: {
    resizeMode: 'cover',
    width: 100 + '%',
    textAlign: 'center',
    alignItems: 'center',
  },
});
