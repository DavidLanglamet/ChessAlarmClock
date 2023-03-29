import React, { useState, useEffect } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

const alarmSounds = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
];

const AlarmSettings = ({ modalVisible, setModalVisible, saveSettings, currentAlarmId, alarmSettings, deleteAlarm, isEnabled }) => {
  const [date, setDate] = useState(alarmSettings?.time || new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DaysAreVisible, setDaysVisible] = useState(false);
  const [selectedAlarmSound, setSelectedAlarmSound] = useState(alarmSettings?.alarmSound || null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [boxColors, setBoxColors] = useState([
    '#282e36', // Mo
    '#282e36', // Tu
    '#282e36', // We
    '#282e36', // Tu
    '#282e36', // Fr
    '#282e36', // Sa
    '#282e36', // Su
  ]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const saveAlarmSettings = () => {
    let repeatDays = [];
    if (DaysAreVisible) {
      repeatDays = boxColors.map((color, index) => color === '#70d24e' ? index : -1).filter(index => index !== -1);
    }
    if (currentAlarmId) {
      saveSettings(currentAlarmId, {
        time: date,
        repeatDays: repeatDays,
        alarmSound: selectedAlarmSound,
        daysAreVisible: DaysAreVisible,
        isEnabled: isEnabled,
      });
    }    
  };

  const resetState = () => {
    setDate(alarmSettings?.time || new Date(1598051730000));
    setSelectedAlarmSound(alarmSettings?.alarmSound || null);
    setDaysVisible(alarmSettings?.daysAreVisible || false);
    setBoxColors([
      alarmSettings?.repeatDays.includes(0) ? '#70d24e' : '#282e36', // Mo
      alarmSettings?.repeatDays.includes(1) ? '#70d24e' : '#282e36', // Tu
      alarmSettings?.repeatDays.includes(2) ? '#70d24e' : '#282e36', // We
      alarmSettings?.repeatDays.includes(3) ? '#70d24e' : '#282e36', // Tu
      alarmSettings?.repeatDays.includes(4) ? '#70d24e' : '#282e36', // Fr
      alarmSettings?.repeatDays.includes(5) ? '#70d24e' : '#282e36', // Sa
      alarmSettings?.repeatDays.includes(6) ? '#70d24e' : '#282e36', // Su
    ]);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
    resetState();
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };
  
  const dayPress = (index) => {
    const newColors = [...boxColors];
    newColors[index] = newColors[index] === '#70d24e' ? '#282e36' : '#70d24e';
    setBoxColors(newColors);
  };

  useEffect(() => {
    setDate(alarmSettings?.time || new Date(1598051730000));
    setSelectedAlarmSound(alarmSettings?.alarmSound || null);
    setDaysVisible(alarmSettings?.daysAreVisible || false);
    setBoxColors([
      alarmSettings?.repeatDays.includes(0) ? '#70d24e' : '#282e36', // Mo
      alarmSettings?.repeatDays.includes(1) ? '#70d24e' : '#282e36', // Tu
      alarmSettings?.repeatDays.includes(2) ? '#70d24e' : '#282e36', // We
      alarmSettings?.repeatDays.includes(3) ? '#70d24e' : '#282e36', // Tu
      alarmSettings?.repeatDays.includes(4) ? '#70d24e' : '#282e36', // Fr
      alarmSettings?.repeatDays.includes(5) ? '#70d24e' : '#282e36', // Sa
      alarmSettings?.repeatDays.includes(6) ? '#70d24e' : '#282e36', // Su
    ]);
  }, [alarmSettings]);

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
          <TouchableOpacity className="h-56" onPress={closeModal} />
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
                  data={alarmSounds}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus && value ? alarmSounds.find(sound => sound.value === value).label : (!isFocus ? 'Alarm Sound' : '...')}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  value={selectedAlarmSound}
                  onChange={item => {
                    setSelectedAlarmSound(item.value);
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
              <View className="flex-row p-5 justify-center space-x-40">
                <TouchableOpacity>
                  <Text className="text-red-500 font-bold text-xl" onPress={() => {deleteAlarm(currentAlarmId); setModalVisible(!modalVisible)}}>Delete</Text>
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
  dropdown: {
    height: 50,
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