


/*

import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking, Touchable } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Alarm from "../components/Alarm"
import AlarmSettings from '../components/AlarmSettings'
import { SoundContext } from "../components/SoundContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [username, setUsername] = useState('Tinypixel');

  const onUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };
  
  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log("Error loading username:", error);
      }
    };

    loadUsername();
  }, []);


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
          <TouchableOpacity onPress={() => {navigation.navigate('ChessScreen');}}>
          <Text className="my-16 text-2xl text-center text-white font-bold"> Hello {username}</Text>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={() => {navigation.navigate('Settings', { onUsernameChange });}}>
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

*/
























/* 

import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const puzzleCount = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

const puzzleType = [
  { label: 'Mate in 1', value: "https://lichess.org/training/mateIn1" },
  { label: 'Mate in 2', value: "https://lichess.org/training/mateIn2" },
  { label: 'Mate in 3', value: "https://lichess.org/training/mateIn3" },
  { label: 'Mate in 4', value: "https://lichess.org/training/mateIn4" },
  { label: 'Mate in 5+', value: "https://lichess.org/training/mateIn5" },
];

const Settings = ({ navigation, route }) => {
  const { onUsernameChange } = route.params;
  const [alarmWhilePuzzle, setAlarmWhilePuzzle] = useState(true);
  const [VibrationWhilePuzzle, setVibrationWhilePuzzle] = useState(true);
  const [PieceSound, setPieceSound] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedPuzzleCount, selectPuzzleCount] = useState(puzzleCount[0].value);
  const [selectedType, selectType] = useState(puzzleType[0].value);
  const dropdownRef = useRef(null);
  const [username, setUsername] = useState('Tinypixel');
  const [showUsernameInput, setShowUsernameInput] = useState(false);

  const saveUsername = async (username) => {
    try {
      await AsyncStorage.setItem('username', username);
    } catch (error) {
      console.log("Error saving username:", error);
    }
  };  

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    saveUsername(newUsername);
    onUsernameChange(newUsername);
  };
  
  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log("Error loading username:", error);
      }
    };
  
    loadUsername();
  }, []);
  

  useEffect(() => {
    // Retrieve the value of selectedPuzzleCount from AsyncStorage
    AsyncStorage.getItem('selectedPuzzleCount').then((value) => {
      if (value !== null) {
        selectPuzzleCount(value);
      }
    });

    AsyncStorage.getItem('selectedType').then((value) => {
      if (value !== null) {
        selectType(value);
      }
    });
  }, []);

  const handleDropDownPress = () => {
    dropdownRef.current && dropdownRef.current.open();
    console.log(dropdownRef)
  };

  const handlePuzzleCountChange = (item) => {
    // Update the value of selectedPuzzleCount in state
    selectPuzzleCount(item.value);
    // Save the value of selectedPuzzleCount to AsyncStorage
    AsyncStorage.setItem('selectedPuzzleCount', item.value);
    setIsFocus(false);
  };

  const handleTypeChange = (item) => {
    selectType(item.value);
    AsyncStorage.setItem('selectedType', item.value);
    setIsFocus(false);
  };
  
    return ( 
      <SafeAreaView className="bg-[#303840] flex-1">
            <View className="items-center">
    <View className="my-10 mx-5 w-10/12">
      <Text className="text-white text-2xl font-semibold mb-8">Settings</Text>
      <TouchableOpacity className="flex-row justify-between space-x-px my-4" onPress={() => setShowUsernameInput(!showUsernameInput)}>
        <Text className="text-white text-lg">Username</Text>
        {showUsernameInput ? (
          <TextInput 
          value={username}
          onChangeText={handleUsernameChange}
          style={{ color: 'white', fontSize: 18 }}
          autoFocus
          onBlur={() => setShowUsernameInput(false)}
        />        
        ) : (
          <Text className="text-white text-lg">{username}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity className="flex-row justify-between space-x-px py-4" onPress={() => setAlarmWhilePuzzle(!alarmWhilePuzzle)}>
        <Text className="text-white text-lg">Alarm while Puzzle</Text>
        <View className="flex-row space-x-4">
          <Text className={alarmWhilePuzzle === true ? "text-white text-lg" : "text-[#797979] text-lg"}>on</Text>
          <Text className={alarmWhilePuzzle === false ? "text-white text-lg" : "text-[#797979] text-lg"}>off</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row justify-between space-x-px py-4" onPress={() => setVibrationWhilePuzzle(!VibrationWhilePuzzle)}>
        <Text className="text-white text-lg">Vibration while Puzzle</Text>
        <View className="flex-row space-x-4">
          <Text className={VibrationWhilePuzzle === true ? "text-white text-lg" : "text-[#797979] text-lg"}>on</Text>
          <Text className={VibrationWhilePuzzle === false ? "text-white text-lg" : "text-[#797979] text-lg"}>off</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row justify-between space-x-px py-4" onPress={() => setPieceSound(!PieceSound)}>
        <Text className="text-white text-lg">Piece Sound</Text>
        <View className="flex-row space-x-4">
          <Text className={PieceSound === true ? "text-white text-lg" : "text-[#797979] text-lg"}>on</Text>
          <Text className={PieceSound === false ? "text-white text-lg" : "text-[#797979] text-lg"}>off</Text>
        </View>
      </TouchableOpacity>
      <View className="flex-row justify-between space-x-px py-2 items-center" onPress={handleDropDownPress}>
        <Text className="text-white text-lg mr-12">Puzzle Count</Text>
        <Dropdown
          ref={dropdownRef}
          style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={puzzleCount}
          maxHeight={700}
          labelField="label"
          valueField="value"
          placeholder='Alarm Sound'
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={selectedPuzzleCount}
          onChange={handlePuzzleCountChange}
        />
      </View>
      <View className="flex-row justify-between space-x-px py-2 items-center" onPress={handleDropDownPress}>
        <Text className="text-white text-lg mr-14">Puzzle Type</Text>
        <Dropdown
                            ref={dropdownRef}
                            style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={puzzleType}
                            maxHeight={700}
                            labelField="label"
                            valueField="value"
                            placeholder='Alarm Sound'
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            value={selectedType}
                            onChange={handleTypeChange}
                        />        
                    </View>
                    <View className="flex-row justify-between space-x-px py-2 items-center">
      </View>
    </View>
  </View>

  <View className="items-center">
    <TouchableOpacity>
      <View style={{ borderBottomWidth: 6 }} className="items-center rounded-xl bg-[#59626e] px-6 py-2 w-1/2 border-[#47ff2e]">
        <Text className="text-[#47ff2e] text-xl tracking-widest">Tip Jar for</Text>
        <Text className="text-[#47ff2e] text-xl tracking-widest">DinDing-D4</Text>
      </View>
    </TouchableOpacity>
  </View>

  <TouchableOpacity className="absolute bottom-16 right-10 m-2" onPress={() => navigation.goBack()} >
    <Image source={require('../assets/back.png')} className="h-12 w-12" />
  </TouchableOpacity>
</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      flex: 1,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 18,
      color: 'white',
    },
    selectedTextStyle: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default Settings;

*/