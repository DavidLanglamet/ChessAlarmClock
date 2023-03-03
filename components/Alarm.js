import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'

const Alarm = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View className="flex-row items-center rounded-xl bg-[#59626e] px-6 py-4 my-1">
        <View className="flex-1">
            <Text className="text-white text-5xl tracking-widest">12:30</Text>
            <Text className="text-white text-base">everyday</Text>
        </View>
        <Switch
            trackColor={{ false: "#dcdcdc", true: "#8ada6f" }}
            thumbColor={isEnabled ? "#FFF" : "#FFF"}
            ios_backgroundColor="#dcdcdc"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    </View>
  )
}

export default Alarm