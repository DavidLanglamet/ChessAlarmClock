import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const puzzleCount = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ];

  const puzzleType = [
    { label: 'Mate in 1', value: '1' },
    { label: 'Mate in 2', value: '2' },
    { label: 'Mate in 3', value: '3' },
    { label: 'Mate in 4', value: '4' },
  ];

const Settings = ({ navigation }) => {

    const [alarmWhilePuzzle, setAlarmWhilePuzzle] = useState(true);
    const [VibrationWhilePuzzle, setVibrationWhilePuzzle] = useState(true);
    const [PieceSound, setPieceSound] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [selectedPuzzleCount, selectPuzzleCount] = useState(puzzleCount[0].value);
    const [selectedType, selectType] = useState(puzzleType[0].value);
    const dropdownRef = useRef(null);
  
  const handleDropDownPress = () => {
    dropdownRef.current && dropdownRef.current.open(); //only works after having pressed the dropDown once.
    console.log(dropdownRef)
  };

    return ( 
      <SafeAreaView className="bg-[#303840] flex-1">
            <View className="items-center">
                <View className="my-10 mx-5 w-10/12">
                    <Text className="text-white text-2xl font-semibold mb-8">Settings</Text>
                    <TouchableOpacity className="flex-row justify-between space-x-px my-4" onPress={() => {navigation.navigate('LogInScreen');}}>
                        <Text className="text-white text-lg">Username</Text>
                        <Text className="text-white text-lg">Tinypixel</Text>
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
                      <Text className="text-white text-lg mr-3">Puzzle Count</Text>
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
                            onChange={item => {
                              selectPuzzleCount(item.value);
                              setIsFocus(false);
                            }}
                        />          
                    </View>
                    <View className="flex-row justify-between space-x-px py-2 items-center" onPress={handleDropDownPress}>
                      <Text className="text-white text-lg mr-5">Puzzle Type</Text>
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
                            onChange={item => {
                              selectType(item.value);
                              setIsFocus(false);
                            }}
                        />          
                    </View>
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
