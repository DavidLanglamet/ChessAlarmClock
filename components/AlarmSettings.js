// Version of using actual timePicker. File: AlarmSettings.js

import React, {useState} from 'react';
import {Alert, Modal, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from '../components/TimePicker';
import { Dropdown } from 'react-native-element-dropdown';


// import DropDownPicker from 'react-native-dropdown-picker';


// next link is for dropdown picker issues
// https://stackoverflow.com/questions/67573201/react-native-dropdown-picker-how-to-fix-the-dropdown-picker-overlay-on-other-co
// https://blog.logrocket.com/react-native-gesture-handler-swipe-long-press-and-more/
// https://stackoverflow.com/questions/4147046/is-it-possible-to-remove-am-pm-button-from-timepicker
// https://github.com/hoaphantn7604/react-native-element-dropdown
// timePicker for android:
// https://stackoverflow.com/questions/58925515/using-react-native-community-datetimepicker-how-can-i-display-a-datetime-picker

// TODO:
// add a little v at the top of the modal to make it clear that you can swipe down and discard changes.
// add functionality of setting time of alarms and so on.


const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
];

const AlarmSettings = ({ modalVisible, setModalVisible, saveSettings, currentAlarmId }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DaysAreVisible, setDaysVisible] = useState(false);  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    // console.log(currentDate);
  };

  const saveAlarmSettings = () => {
    if (currentAlarmId) {
      saveSettings(currentAlarmId, {
        time: date,
        repeatDays: boxColors.map((color, index) => color === '#70d24e' ? index : -1).filter(index => index !== -1),
        alarmSound: value,
      });
    }
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const showTimepicker = () => {
    setShow(true);
    showMode('time');
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [boxColors, setBoxColors] = useState([
    '#282e36', // Monday
    '#282e36', // Tuesday
    '#282e36', // Wednesday
    '#282e36', // Thursday
    '#282e36', // Friday
    '#282e36', // Saturday
    '#282e36', // Sunday
  ]);
  
  const dayPress = (index) => {
    const newColors = [...boxColors];
    newColors[index] = newColors[index] === '#70d24e' ? '#282e36' : '#70d24e';
    setBoxColors(newColors);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View>
          <TouchableOpacity className="h-56" onPress={() => setModalVisible(!modalVisible)} />
          <View>
            <View className="bg-[#1d2127] rounded-3xl h-screen">
              <Text className="text-white my-3 font-bold text-base text-center">Alarm Settings</Text>
              <View className="h-1/4 items-center justify-center">
              <DateTimePicker
                  textColor="white"
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  locale="en-DE"
                  display="spinner"
                  onChange={onChange}
                />
              </View>
              <View className="my-3 w-2/3 ml-auto mr-auto">
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Alarm Sound' : '...'}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View className="h-32">
                <TouchableOpacity className="flex-row space-x-36 justify-center my-2 p-2" onPress={() => setDaysVisible(!DaysAreVisible)}>
                  <Text className="text-white text-lg">Repeat</Text>
                  <View className="flex-row space-x-4">
                    <Text className={DaysAreVisible === true ? "text-white text-lg" : "text-[#797979] text-lg"}>on</Text>
                    <Text className={DaysAreVisible === false ? "text-white text-lg" : "text-[#797979] text-lg"}>off</Text>
                  </View>
                </TouchableOpacity>
                {DaysAreVisible && (
                  <View className="flex-row mx-3 items-center justify-between">
                    <TouchableOpacity key={0} className="items-center" onPress={() => dayPress(0)}>
                      <View style={{backgroundColor: boxColors[0]}} className="w-8 h-8 rounded-lg border-solid border-4 border-[#3d454e] mx-2"/>
                      <Text className="text-white my-2">Mo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={1} className="items-center" onPress={() => dayPress(1)}>
                      <View style={{backgroundColor: boxColors[1]}} className="w-8 h-8 rounded-lg border-solid border-4 border-[#3d454e] mx-2"/>
                      <Text className="text-white my-2">Tu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={2} className="items-center" onPress={() => dayPress(2)}>
                      <View style={{backgroundColor: boxColors[2]}} className="w-8 h-8 rounded-lg border-solid border-4 border-[#3d454e] mx-2"/>
                      <Text className="text-white my-2">We</Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={3} className="items-center" onPress={() => dayPress(3)}>
                      <View style={{backgroundColor: boxColors[3]}} className="w-8 h-8 rounded-lg border-solid border-4 border-[#3d454e] mx-2"/>
                      <Text className="text-white my-2">Th</Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={4} className="items-center" onPress={() => dayPress(4)}>
                      <View style={{backgroundColor: boxColors[4]}} className="w-8 h-8 rounded-lg border-solid border-4 border-[#3d454e] mx-2"/>
                      <Text className="text-white my-2">Fr</Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={5} className="items-center" onPress={() => dayPress(5)}>
                      <View style={{backgroundColor: boxColors[5]}} className="w-8 h-8 rounded-lg border-solid border-4 border-[#3d454e] mx-2"/>
                      <Text className="text-white my-2">Sa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={6} className="items-center" onPress={() => dayPress(6)}>
                      <View style={{backgroundColor: boxColors[6]}} className="w-8 h-8 rounded-lg border-solid border-4 border-[#3d454e] mx-2"/>
                      <Text className="text-white my-2">Su</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View className="flex-row p-5 justify-center space-x-44">
                <TouchableOpacity>
                  <Text className="text-red-500 font-bold text-xl">Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {saveAlarmSettings(); setModalVisible(!modalVisible);}}>
                  <Text className="text-green-400 font-bold text-xl">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
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

export default AlarmSettings;
