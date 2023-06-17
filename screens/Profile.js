import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({navigation}) => {

  const [username, setUsername] = useState("Your Username");
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [daysStreak, setDaysStreak] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('username').then((value) => {
      if (value !== null) {
        setUsername(value);
      }
    });

    AsyncStorage.getItem('puzzlesSolved').then((value) => {
      if (value !== null) {
        setPuzzlesSolved(JSON.parse(value)); // parse the string to number
      }
    });

    AsyncStorage.getItem('daysStreak').then((value) => {
      if (value !== null) {
        setDaysStreak(JSON.parse(value));
      }
    });
  }, []);

  return (
    <View className="bg-[#303840] flex-1">
      <Image source={require('../assets/tempBanner2.png')} className="w-screen h-72" />
      <View className="items-center my-2">
        <Text className="text-base text-white">Level 11</Text>
        <Text className="mx-8 text-white my-10 text-base">
        Daniel Naroditsky is an American chess Grandmaster born in 1995. He won the U.S. 
        Junior Chess Championship at the age of 11 and has since become one of the top chess players in 
        the United States. Naroditsky is also known for his coaching and chess commentary.
        </Text>
        <View className="flex-row space-x-16 my-5">
          <View className="items-center">
            <Text className="text-white text-4xl">{daysStreak}</Text>
            <Text className="text-white text-base">days streak</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-4xl">{puzzlesSolved}</Text>
            <Text className="text-white text-base">puzzles solved</Text>
          </View>
        </View>
      </View>
      <Text style={{ bottom: 74 }} className="absolute left-10 m-2 text-white text-lg">{username}</Text>
      <TouchableOpacity className="absolute bottom-16 right-10 m-2" onPress={() => navigation.goBack()} >
        <Image source={require('../assets/back.png')} className="h-12 w-12" />
      </TouchableOpacity>
    </View>
  )
}

export default Profile
