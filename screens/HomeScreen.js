import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking, Vibration } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'
import { SoundContext } from "../components/SoundContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const { playSound } = useContext(SoundContext);
  const [canRunPuzzle, setCanRunPuzzles] = useState(true);
  const [canRunAddAlarm, setCanRunAddAlarm] = useState(true);
  const [alarmWhilePuzzle, setAlarmWhilePuzzle] = useState(true);
  const [username, setUsername] = useState("Your Username");
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState(() => {
    // Fetch the alarms when initializing state
    loadAlarms();
    // Initialize to an empty array
    return [];
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlarmId, setCurrentAlarmId] = useState(null);
  const [currentAlarmSettings, setCurrentAlarmSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadAlarms() {
    const storedAlarms = await AsyncStorage.getItem('alarms');
    if (storedAlarms !== null) {
      setAlarms(JSON.parse(storedAlarms));
    }
  }

  useEffect(() => {
    AsyncStorage.setItem('alarms', JSON.stringify(alarms)).then(() => {
      setLoading(false);
    });
  }, [alarms]);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.getItem('alarms').then((storedAlarms) => {
        if (storedAlarms !== null) {
          let parsedAlarms = JSON.parse(storedAlarms);
          parsedAlarms = parsedAlarms.map(alarm => {
            alarm.settings.time = new Date(alarm.settings.time);
            return alarm;
          });
          setAlarms(parsedAlarms);
        }        
      });
    }
  }, [loading]);

  useEffect(() => {
    AsyncStorage.getItem('alarms').then((alarms) => {
      if (alarms !== null) {
        let parsedAlarms = JSON.parse(alarms);
        parsedAlarms = parsedAlarms.map(alarm => {
          alarm.settings.time = new Date(alarm.settings.time);
          return alarm;
        });
        setAlarms(parsedAlarms);
      }      
    });

    AsyncStorage.getItem('alarmWhilePuzzle').then((value) => {
      if (value !== null) {
        setAlarmWhilePuzzle(JSON.parse(value));
      }
    });

    AsyncStorage.getItem('username').then((value) => {
      if (value !== null) {
        setUsername(value);
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('username').then((value) => {
        if (value !== null) {
          setUsername(value);
        }
      });
  
      // return statement serves like componentWillUnmount
      return () => {};
    }, [])
  );

  const toggleSwitch = (id, isEnabled) => {
    setAlarms(prevAlarms => prevAlarms.map((alarm) => {
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
    setAlarms(prevAlarms => [...prevAlarms, newAlarm]);
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
    setAlarms(prevAlarms => prevAlarms.map((alarm) => (alarm.id === id ? { ...alarm, settings } : alarm)));
  };

  const deleteAlarm = (id) => {
    const filteredAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(prevAlarms => prevAlarms.filter((alarm) => alarm.id !== id));
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
      const matchedAlarms = alarms.filter((alarm) => {
        const alarmTime = new Date(alarm.settings.time);
        let today = currentTime.getDay();
        if(today === 0) {
            today = 6;
        } else {
            today = today - 1;
        }
        return (
          alarm.settings.isEnabled &&
          currentTime.getHours() === alarmTime.getHours() &&
          currentTime.getMinutes() === alarmTime.getMinutes() &&
          (alarm.settings.repeatDays.length === 0 || alarm.settings.repeatDays.includes(today))
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

  goToPuzzle = async () => { 
    Vibration.vibrate([500, 500], true);
    const latestAlarmWhilePuzzle = JSON.parse(await AsyncStorage.getItem('alarmWhilePuzzle'));
    playSound();
    navigation.navigate('ChessScreen', { alarmWhilePuzzle: latestAlarmWhilePuzzle });
  }

  return (
      <SafeAreaView className="bg-[#303840] flex-1">
        <View className="h-full mt-8">
          <TouchableOpacity onPress={() => {console.log(alarms) }}>
            <Text className="my-16 text-2xl text-center text-white font-bold"> Hello {username}</Text>
          </TouchableOpacity>
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
