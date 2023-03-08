import { View, Text, Switch, Animated } from 'react-native'
import React, { useState } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Alarm = ({ deleteAlarm, alarm }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
    
  return (
    <Swipeable
      renderRightActions={RightActions}
      onSwipeableRightOpen={() => deleteAlarm(alarm.id)}
    >
      <View className="flex-row items-center rounded-xl bg-[#59626e] px-6 py-4 my-1">
          <View className="flex-1">
              <Text className="text-white text-5xl tracking-widest">12:30</Text>
              <Text className="text-white text-base">everyday</Text>
          </View>
          <Switch
              trackColor={{ false: "#dcdcdc", true: "#8ada6f"}}
              thumbColor={isEnabled ? "#FFF" : "#FFF"}
              ios_backgroundColor="#dcdcdc"
              onValueChange={toggleSwitch}
              value={isEnabled}
          />
      </View>
    </Swipeable>
  );
};
// switch color  8ada6f     3e9950    47FF2E
export default Alarm
