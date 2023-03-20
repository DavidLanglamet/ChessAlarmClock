import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Profile = ({navigation}) => {
  return (
    <View className="bg-[#303840] flex-1">
      <Image source={require('../assets/tempBanner2.png')} className="w-screen h-72" />
      <TouchableOpacity className="absolute bottom-20 right-10 m-2" onPress={() => navigation.goBack()} >
        <Image source={require('../assets/back.png')} className="h-12 w-12" />
      </TouchableOpacity>
    </View>
  )
}

export default Profile