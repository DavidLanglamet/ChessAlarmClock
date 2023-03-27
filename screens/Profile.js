import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Profile = ({navigation}) => {
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
            <Text className="text-white text-4xl">13</Text>
            <Text className="text-white text-base">days streak</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-4xl">195</Text>
            <Text className="text-white text-base">days streak</Text>
          </View>
        </View>
      </View>
      <Text style={{ bottom: 74 }} className="absolute left-10 m-2 text-white text-lg">tinypixel</Text>
      <TouchableOpacity className="absolute bottom-16 right-10 m-2" onPress={() => navigation.goBack()} >
        <Image source={require('../assets/back.png')} className="h-12 w-12" />
      </TouchableOpacity>
    </View>
  )
}

export default Profile
