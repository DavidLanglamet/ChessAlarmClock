import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'
import { Audio } from 'expo-av';

const HomeScreen = () => {

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/Hello.mp3') );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  

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
      isEnabled: true,
      settings: {
        alarmSound: null,
        time: currentTime,
        repeatDays: [], 
        daysAreVisible: false, 
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

  const chessPress = () => {
    Linking.openURL('https://lichess.org/training/daily');
  };

  // Sort alarms by time
  const sortedAlarms = alarms.sort((a, b) => new Date(a.settings.time) - new Date(b.settings.time));

  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <View className="h-full mt-8">
        <Text className="my-16 text-2xl text-center text-white font-bold">Hello Tinypixel</Text>
        <ScrollView className="mx-5">
          {/* This is where the Alarms go! */}
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
        <AlarmSettings 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible} 
          saveSettings={saveSettings} 
          currentAlarmId={currentAlarmId} 
          alarmSound={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings.alarmSound}
          alarmSettings={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings}
          deleteAlarm={deleteAlarm}
          currentAlarmSettings={currentAlarmSettings}
          handleAlarmPress={handleAlarmPress}
        />
        <View className="items-center my-4 fixed">
          <TouchableOpacity
            className="bg-[#59626e] rounded-full items-center h-14 w-14 justify-center" onPress={() => {handleAddAlarm()}}>
            <Text className="text-white text-5xl font-light">+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('ChessScreen');}} >
            <Text>Chess Screen</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center space-x-44 my-12">
          <TouchableOpacity onPress={() => {navigation.navigate('Settings');}}>
            <Image source={require('../assets/settingsIcon2.png')} className="h-10 w-10" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full" onPress={() => {navigation.navigate('Profile');}}>
            <Image source={require('../assets/danielNaroditsky.png')} className="h-20 w-20" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;























/* VERSION WHERE THE CHESS SCREEN IS OPENED WHEN AN ALARM RINGS. PROBLEM IN THIS ONE IS IT NEEDS TO ONLY START WORKING AFTER HITTING SAVE.

import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'
import { Audio } from 'expo-av';

const HomeScreen = () => {

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/Hello.mp3') );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlarmId, setCurrentAlarmId] = useState(null);
  const [currentAlarmSettings, setCurrentAlarmSettings] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleAddAlarm = () => {
    const currentTime = new Date();
    currentTime.setSeconds(0, 0);
    const newAlarm = {
      id: Date.now(),
      isEnabled: true,
      settings: {
        alarmSound: null,
        time: currentTime,
        repeatDays: [], 
        daysAreVisible: false, 
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

  const chessPress = () => {
    Linking.openURL('https://lichess.org/training/daily');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const matchedAlarms = alarms.filter((alarm) => {
      const alarmTime = new Date(alarm.settings.time);
      return currentTime.getHours() === alarmTime.getHours() && currentTime.getMinutes() === alarmTime.getMinutes();
    });

    if (matchedAlarms.length > 0) {
      playSound();
      navigation.navigate('ChessScreen');
    }
  }, [currentTime]);

  // Sort alarms by time
  const sortedAlarms = alarms.sort((a, b) => new Date(a.settings.time) - new Date(b.settings.time));

  return (
  <SafeAreaView className="bg-[#303840] flex-1">
  <View className="h-full mt-8">
  <Text className="my-16 text-2xl text-center text-white font-bold">Hello Tinypixel</Text>
  <ScrollView className="mx-5">
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
    <AlarmSettings
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    saveSettings={saveSettings}
    currentAlarmId={currentAlarmId}
    alarmSound={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings.alarmSound}
    alarmSettings={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings}
    deleteAlarm={deleteAlarm}
    currentAlarmSettings={currentAlarmSettings}
    handleAlarmPress={handleAlarmPress}
    />
    <View className="items-center my-4 fixed">
    <TouchableOpacity
    className="bg-[#59626e] rounded-full items-center h-14 w-14 justify-center" onPress={() => {handleAddAlarm()}}>
    <Text className="text-white text-5xl font-light">+</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {navigation.navigate('ChessScreen');}} >
    <Text>Chess Screen</Text>
    </TouchableOpacity>
    </View>
    <View className="flex-row items-center justify-center space-x-44 my-12">
    <TouchableOpacity onPress={() => {navigation.navigate('Settings');}}>
    <Image source={require('../assets/settingsIcon2.png')} className="h-10 w-10" />
    </TouchableOpacity>
    <TouchableOpacity className="rounded-full" onPress={() => {navigation.navigate('Profile');}}>
    <Image source={require('../assets/danielNaroditsky.png')} className="h-20 w-20" />
    </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
    )
    }
    
    export default HomeScreen;

*/