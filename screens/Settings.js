import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const alarmSounds = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ];

const Settings = ({ navigation }) => {

    const [alarmWhilePuzzle, setAlarmWhilePuzzle] = useState(true);
    const [VibrationWhilePuzzle, setVibrationWhilePuzzle] = useState(true);
    const [PieceSound, setPieceSound] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [selectedAlarmSound, setSelectedAlarmSound] = useState(alarmSounds[0].value);

    return ( 
      <SafeAreaView className="bg-[#303840] flex-1">
            <View className="items-center">
                <View className="my-10 mx-5 w-10/12">
                    <Text className="text-white text-2xl font-semibold mb-8">Settings</Text>
                    <View className="flex-row justify-between space-x-px my-4">
                        <Text className="text-white text-lg">Username</Text>
                        <Text className="text-white text-lg">Tinypixel</Text>
                    </View>
                    <TouchableOpacity className="flex-row justify-between space-x-px py-2 items-center">
                        <Text className="text-white text-lg">Puzzles</Text>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={alarmSounds}
                            maxHeight={700}
                            labelField="label"
                            valueField="value"
                            placeholder='Alarm Sound'
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            value={selectedAlarmSound}
                            onChange={item => {
                              setSelectedAlarmSound(item.value);
                              setIsFocus(false);
                            }}
                        />          
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
                </View>
            </View>

            <View className="items-center">
                <TouchableOpacity>
                  <View className="items-center rounded-xl bg-[#59626e] px-6 py-2 w-1/2 border-b-4 border-[#47ff2e]">
                    <Text className="text-[#47ff2e] text-xl tracking-widest">Tip Jar for</Text>
                    <Text className="text-[#47ff2e] text-xl tracking-widest">DinDing-D4</Text>
                  </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity className="absolute bottom-20 right-10 m-2" onPress={() => navigation.goBack()} >
                <Image source={require('../assets/Back.png')} className="h-12 w-12" />
            </TouchableOpacity>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      width: 70,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
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
