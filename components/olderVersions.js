// Version of using actual timePicker. File: AlarmSettings.js

import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// https://blog.logrocket.com/react-native-gesture-handler-swipe-long-press-and-more/
// https://stackoverflow.com/questions/4147046/is-it-possible-to-remove-am-pm-button-from-timepicker

// TODO: The plus button on the homescreen should open it and clicking an alarm too
// add a little v at the top of the modal to make it clear that you can swipe down and discard changes.
// Clicking above the modal discards changes too.
// remove AM/PM column

const AlarmSettings = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
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

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <TouchableOpacity className="h-64" onPress={() => setModalVisible(!modalVisible)} />
          <View>
            <View className="bg-[#1d2127] rounded-3xl h-screen">
              <Text className="text-white my-5 font-bold text-lg text-center">Alarm Settings</Text>
              <View className="h-72 items-center">
                <DateTimePicker
                  textColor="white"
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                />
              </View>
              <View className="flex-row mx-3 items-center justify-between">
                <TouchableOpacity className="w-1/12 h-8 bg-[#70d24e] rounded-lg border-solid border-4 border-[#3d454e] mx-2">
                </TouchableOpacity>
                <TouchableOpacity className="w-1/12 h-8 bg-[#70d24e] rounded-lg border-solid border-4 border-[#3d454e] mx-2">
                </TouchableOpacity>
                <TouchableOpacity className="w-1/12 h-8 bg-[#70d24e] rounded-lg border-solid border-4 border-[#3d454e] mx-2">
                </TouchableOpacity>
                <TouchableOpacity className="w-1/12 h-8 bg-[#70d24e] rounded-lg border-solid border-4 border-[#3d454e] mx-2">
                </TouchableOpacity>
                <TouchableOpacity className="w-1/12 h-8 bg-[#70d24e] rounded-lg border-solid border-4 border-[#3d454e] mx-2">
                </TouchableOpacity>
                <TouchableOpacity className="w-1/12 h-8 bg-[#70d24e] rounded-lg border-solid border-4 border-[#3d454e] mx-2">
                </TouchableOpacity>
                <TouchableOpacity className="w-1/12 h-8 bg-[#70d24e] rounded-lg border-solid border-4 border-[#3d454e] mx-2">
                </TouchableOpacity>
              </View>
              <View className="flex-row p-10 justify-center">
                <TouchableOpacity>
                  <Text className="text-red-500 font-bold text-xl">Delete</Text>
                </TouchableOpacity>
                <View className="w-52"></View>
                <TouchableOpacity>
                  <Text className="text-green-400 font-bold text-xl">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1d2127',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  box: {
    width: '12%',
    height: 40,
    backgroundColor: 'green',
    borderRadius: 10,
  },
});

export default AlarmSettings;




















/*
<View className="flex-row p-10 justify-center">
                <TouchableOpacity>
                  <Text className="text-red-500 font-bold text-xl">Delete</Text>
                </TouchableOpacity>
                <View className="w-52"></View>
                <TouchableOpacity>
                  <Text className="text-green-400 font-bold text-xl">Save</Text>
                </TouchableOpacity>
              </View>
*/









/*

<View className="flex-row items-center px-6 py-9 mx-5">
          <View className="flex-1">
            <TouchableOpacity>
              <Image source={require('../assets/settingsIcon.png')} className="h-10 w-10" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-white rounded-full items-center h-16 w-16 justify-center">

          </TouchableOpacity>
        </View>

*/