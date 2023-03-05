import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);

  const handleAddAlarm = () => {
    const newAlarm = { id: Date.now() };
    setAlarms([...alarms, newAlarm]);
  };

  const deleteAlarm = (id) => {
    const filteredAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(filteredAlarms);
  };

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      });
  }, []);

  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <View>
        <Text className="my-20 text-2xl text-center text-white font-bold">Hello Tinypixel</Text>
        <AlarmSettings/>
        <ScrollView className="h-80 mx-5">
          {/* This is where the Alarms will go! */}
          {
            alarms.map((alarm) => (
              <Alarm key={alarm.id} deleteAlarm={deleteAlarm} alarm={alarm} />
            ))
          }
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