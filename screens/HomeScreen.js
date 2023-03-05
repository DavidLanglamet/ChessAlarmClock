import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);

  const handleAddAlarm = () => {
    setAlarms([...alarms, <Alarm key={alarms.length} />]);
  };

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      });
  }, [])

  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <View>
        <Text className="my-20 text-2xl text-center text-white font-bold">Hello Tinypixel</Text>
        <AlarmSettings/>
        <ScrollView className="h-80 mx-5">
          <Alarm />
          {alarms}
        </ScrollView>
        <View className="items-center my-8">
          <TouchableOpacity className="bg-[#59626e] rounded-full items-center h-14 w-14 justify-center" onPress={handleAddAlarm}>
            <Text className="text-white text-5xl font-light">+</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center px-6 py-9 mx-5">
          <View className="flex-1">
            <Image source={require('../assets/settingsIcon.png')} className="h-10 w-10" />
          </View>
          <TouchableOpacity className="bg-white rounded-full items-center h-16 w-16 justify-center">

          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;







/* OLD VERSION WITH THE BOX AROUND ALL ALARMS

  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <View>
          <Text className="my-20 text-2xl text-center text-white font-bold ">Hello Tinypixel</Text>
          <ScrollView className="bg-[#59626e] rounded-xl h-80 mx-5">
            <View className="flex-row items-center rounded-xl bg-[#7b8899] px-6 py-4 mx-2 my-2">
              <View className="flex-1">
                <Text className="text-white text-5xl tracking-widest">12:30</Text>
                <Text className="text-white text-base">everyday</Text>
              </View>
              <Switch></Switch>
            </View>
          </ScrollView>
          <View className="items-center my-8">
            <TouchableOpacity className="bg-[#59626e] rounded-full items-center h-16 w-16 justify-center">
              <Text className="text-white text-5xl font-light">+</Text>
            </TouchableOpacity>
          </View>
          <View>

          </View>
      </View>
    </SafeAreaView>
  )
*/