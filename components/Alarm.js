import { View, Text, Switch, Animated, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// FIX:
// The days selection is only adjusting the last added alarms days and not the one you select. Turning it off also doesn't work.

const Alarm = ({ alarm, deleteAlarm, setCurrentAlarmId, setModalVisible, setCurrentAlarmSettings, handleAlarmPress }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const RightActions = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
      })

      return (
        <View className="bg-red-500 justify-center my-1 rounded-xl flex-1">
          <Animated.Text className="text-white font-bold text-right mx-5">Delete</Animated.Text>
        </View>
      )
    };

    // Add this function to get the day abbreviation based on the index
  const getDayAbbreviation = (index) => {
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return days[index];
  };

  // Add this function to create the repeat days text
  const repeatDaysText = () => {
    if (alarm.settings.repeatDays.length === 0) {
      return "One Time";
    }
    return alarm.settings.repeatDays.map((dayIndex) => getDayAbbreviation(dayIndex)).join(", ");
  };

    const handlePress = () => {
      setCurrentAlarmId(alarm.id);
      setCurrentAlarmSettings(alarm.settings);
      setModalVisible(true);
    };
    
  return (
    <Swipeable
      renderRightActions={RightActions}
      onSwipeableRightOpen={() => deleteAlarm(alarm.id)}
    >
      <TouchableOpacity onPress={() => { handleAlarmPress(alarm.id);}}>
        <View className="flex-row items-center rounded-xl bg-[#59626e] px-6 py-4 my-1 border-b-4 border-[#48505a]">
          <View className="flex-1">
            <Text className="text-white text-5xl tracking-widest">{alarm.settings.time ? alarm.settings.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : ''}</Text>
            <Text className="text-white text-sm">{repeatDaysText()}</Text>
          </View>
          <Switch
              trackColor={{ false: "#dcdcdc", true: "#8ada6f"}}
              thumbColor={isEnabled ? "#FFF" : "#FFF"}
              ios_backgroundColor="#dcdcdc"
              onValueChange={toggleSwitch}
              value={isEnabled}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

// switch color  8ada6f     3e9950    47FF2E
export default Alarm