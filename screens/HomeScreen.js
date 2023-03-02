import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <View className="my-28">
          <Text className="text-xl text-center text-white font-bold">Hello Tinypixel</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen