import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const LogInScreen = ({navigation}) => {

  return (
    <SafeAreaView className="flex-1 bg-[#161512]">
        <TouchableOpacity className="flex flex-col items-center justify-center h-full relative" onPress={() => {navigation.navigate('HomeScreen');}}>
          <Text className="text-white text-3xl absolute top-24">   
            Have A Great Day Champ!
          </Text>
          <View className="self-center">
            <Image source={require('../assets/Magnus.png')}
            style={{ width: 300, height: 300, marginBottom: 20 }}
            />
          </View>
        </TouchableOpacity>
</SafeAreaView>
  )
}

export default LogInScreen