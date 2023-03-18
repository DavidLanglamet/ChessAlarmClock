import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'

// TODO:
// Check if pressing + twice quickly causes problems
// make the cancel button work correctly

const HomeScreen = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [currentAlarmId, setCurrentAlarmId] = useState(null);

  const [currentAlarmSettings, setCurrentAlarmSettings] = useState(null);

  const handleAddAlarm = () => {
    const currentTime = new Date();
    currentTime.setSeconds(0, 0);
    const newAlarm = {
      id: Date.now(),
      settings: {
        alarmSound: null,
        time: currentTime,
        repeatDays: [], // repeatDays is off
        daysAreVisible: false, // Add this line to store the daysAreVisible state
      },
    };
    setCurrentAlarmId(newAlarm.id);
    setAlarms([...alarms, newAlarm]);
    setModalVisible(true);
  };
  
  const handleAlarmPress = (id) => {
    setCurrentAlarmId(id);
    setCurrentAlarmSettings(alarms.find((alarm) => alarm.id === id).settings);
    setModalVisible(true);
  };

  const saveSettings = (id, settings) => {
    setAlarms(alarms.map((alarm) => (alarm.id === id ? { ...alarm, settings } : alarm)));
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

  // Sort alarms by time
  const sortedAlarms = alarms.sort((a, b) => new Date(a.settings.time) - new Date(b.settings.time));

  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <View>
        <Text className="my-16 text-2xl text-center text-white font-bold">Hello Tinypixel</Text>
        <ScrollView className="h-1/2 mx-5">
          {/* This is where the Alarms will go! */}
          {
      sortedAlarms.map((alarm) => (
        <Alarm
          key={alarm.id}
          handleAlarmPress={handleAlarmPress}
          deleteAlarm={deleteAlarm}
          alarm={alarm}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setCurrentAlarmId={setCurrentAlarmId}
          setCurrentAlarmSettings={setCurrentAlarmSettings}
        />
      ))
    }
        </ScrollView>
        <View className="items-center my-8">
        <AlarmSettings 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible} 
          saveSettings={saveSettings} 
          currentAlarmId={currentAlarmId} 
          alarmSound={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings.alarmSound}
          alarmSettings={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings}
          deleteAlarm={deleteAlarm}
        />
        <TouchableOpacity
          className="bg-[#59626e] rounded-full items-center h-14 w-14 justify-center" onPress={() => {handleAddAlarm()}}>
          <Text className="text-white text-5xl font-light">+</Text>
        </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center space-x-44 my-2">
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