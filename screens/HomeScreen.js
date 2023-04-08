import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'
import { SoundContext } from "../components/SoundContext";

const HomeScreen = () => {

  const { playSound } = useContext(SoundContext);
  const [canRunPuzzle, setCanRunPuzzles] = useState(true);
  const [canRunAddAlarm, setCanRunAddAlarm] = useState(true);

  const toggleSwitch = (id, isEnabled) => {
    setAlarms(alarms.map((alarm) => {
      if (alarm.id === id) {
        return {
          ...alarm,
          settings: {
            ...alarm.settings,
            isEnabled: isEnabled,
          },
        };
      }
      return alarm;
    }));
  };

  const [sound, setSound] = React.useState();

  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlarmId, setCurrentAlarmId] = useState(null);
  const [currentAlarmSettings, setCurrentAlarmSettings] = useState(null);

  const handleAddAlarm = () => {
    if (!canRunAddAlarm) {
      console.log('Function is on cooldown');
      return;
    }

    const currentTime = new Date();
    currentTime.setSeconds(0, 0);
    const newAlarm = {
      id: Date.now(),
      settings: {
        alarmSound: null,
        time: currentTime,
        repeatDays: [],
        daysAreVisible: false, 
        isEnabled: true,
      },
    };
    setCurrentAlarmId(newAlarm.id);
    setAlarms([...alarms, newAlarm]);
    setModalVisible(true);

    setCanRunAddAlarm(false);
      setTimeout(() => {
        setCanRunAddAlarm(true);
      }, 1000);
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

  
  const [currentTime, setCurrentTime] = useState(new Date());  


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

      return () => clearInterval(intervalId);
    }, []);

  useEffect(() => {
    // console.log(alarms)
    const matchedAlarms = alarms.filter((alarm) => {
      const alarmTime = new Date(alarm.settings.time);
      return (
        alarm.settings.isEnabled &&
        currentTime.getHours() === alarmTime.getHours() &&
        currentTime.getMinutes() === alarmTime.getMinutes()
      );
   });

    if (matchedAlarms.length > 0 && !modalVisible) {
      if (!canRunPuzzle) {
        console.log('Function is on cooldown');
        return;
      }

      matchedAlarms.forEach((alarm) => {
        if (alarm.settings.repeatDays.length === 0) {
          toggleSwitch(alarm.id, false);
        }
      });
    
      goToPuzzle();
    
      setCanRunPuzzles(false);
      setTimeout(() => {
        setCanRunPuzzles(true);
      }, 62000);
    }
  }, [currentTime]);

  goToPuzzle = () => {
    playSound();
    navigation.navigate('ChessScreen');
  }

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
                  toggleSwitch={toggleSwitch}
                  isEnabled={alarm.settings.isEnabled}
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
            isEnabled={alarms.find((alarm) => alarm.id === currentAlarmId)?.settings.isEnabled}
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
            <TouchableOpacity className="rounded-full" onPress={() => {navigation.navigate('Profile'); }}>
              <Image source={require('../assets/danielNaroditsky.png')} className="h-20 w-20" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default HomeScreen;
