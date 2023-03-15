import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Alarm from './Alarm';
import AlarmSettings from './AlarmSettings';

const AlarmManager = () => {

    const [alarmTime, setAlarmTime] = useState(null);
    const hours = alarmTime?.getHours();
    const minutes = alarmTime?.getMinutes();

    const handleSaveAlarmTime = (time) => {
      setAlarmTime(time);
    };
    
  const [alarms, setAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addAlarm = (newAlarm) => {
    setAlarms([...alarms, newAlarm]);
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  const saveAlarmSettings = (settings) => {
    const { id } = settings;
    const index = alarms.findIndex((alarm) => alarm.id === id);
    const newAlarms = [...alarms];
    newAlarms[index] = settings;
    setAlarms(newAlarms);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Add Alarm</Text>
      </TouchableOpacity>
      {alarms.map((alarm) => (
        <Alarm
          key={alarm.id}
          alarm={alarm}
          deleteAlarm={deleteAlarm}
          setModalVisible={setModalVisible}
        />
      ))}
        <AlarmSettings
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSave={handleSaveAlarmTime}
        />

    </View>
  );
};

export default AlarmManager;
