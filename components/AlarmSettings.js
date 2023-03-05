import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';

// https://blog.logrocket.com/react-native-gesture-handler-swipe-long-press-and-more/

// TODO: The plus button on the homescreen should open it and clicking an alarm too
// add a little v at the top of the modal to make it clear that you can swipe down and discard changes.
// Clicking above the modal discards changes too.

const AlarmSettings = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        <View className="my-44">
          <View className="bg-[#1d2127] rounded-3xl h-screen">
            <Text className="text-white my-7 font-bold text-lg text-center">Alarm Settings</Text>
            <View className="h-72">
              <Text className="text-white">TimePickerHere</Text>
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
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
});

export default AlarmSettings;