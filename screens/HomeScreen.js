import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'

// TODO:
// Check if pressing + twice quickly causes problems
// Make days text appear instead of indices and if nothings selected display "one time"
// Make the default settings page of a newly created alarm be set to repeat off and time should be at 10 AM
// When opening an alarm, display its settings and not the previous ones

const HomeScreen = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [currentAlarmId, setCurrentAlarmId] = useState(null);

  const handleAddAlarm = () => {
    const newAlarm = { id: Date.now(), settings: { alarmSound: null } };
    setCurrentAlarmId(newAlarm.id);
    setAlarms([...alarms, newAlarm]);
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
              <Alarm key={alarm.id} deleteAlarm={deleteAlarm} alarm={alarm} modalVisible={modalVisible} setModalVisible={setModalVisible} setCurrentAlarmId={setCurrentAlarmId} />
            ))
          }
        </ScrollView>
        <View className="items-center my-8">
          <AlarmSettings modalVisible={modalVisible} setModalVisible={setModalVisible} saveSettings={saveSettings} currentAlarmId={currentAlarmId} alarmSound={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings.alarmSound}/>
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