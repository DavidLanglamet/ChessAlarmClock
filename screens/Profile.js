import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Profile = ({navigation}) => {
  return (
    <SafeAreaView className="bg-[#303840] flex-1">
        <Text>Profile</Text>
        <TouchableOpacity className="absolute bottom-20 right-10 m-2" onPress={() => navigation.goBack()} >
            <Image source={require('../assets/Back.png')} className="h-12 w-12" />
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Profile