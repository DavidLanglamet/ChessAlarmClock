import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'

// TODO: Check if pressing + twice quickly causes problems

const HomeScreen = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddAlarm = () => {
    const newAlarm = { id: Date.now() };
    setAlarms([...alarms, newAlarm]);
    setModalVisible(true);
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
        <ScrollView className="h-80 mx-5">
          {/* This is where the Alarms will go! */}
          {
            alarms.map((alarm) => (
              <Alarm key={alarm.id} deleteAlarm={deleteAlarm} alarm={alarm} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            ))
          }
        </ScrollView>
        <View className="items-center my-8">
        <AlarmSettings modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <TouchableOpacity
          className="bg-[#59626e] rounded-full items-center h-14 w-14 justify-center" onPress={() => {setModalVisible(true); handleAddAlarm();}}>
          <Text className="text-white text-5xl font-light">+</Text>
        </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center space-x-44 my-7">
          <TouchableOpacity>
            <Image source={require('../assets/settingsIcon.png')} className="h-10 w-10" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full items-center h-16 w-16 justify-center">

          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;