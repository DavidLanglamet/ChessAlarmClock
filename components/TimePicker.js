import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';

const TimePicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const hoursData = Array.from({ length: 24 }, (_, i) => i);
  const minutesData = Array.from({ length: 60 }, (_, i) => i);

  const handleHoursSelect = (hour) => {
    setHours(hour);
  };

  const handleMinutesSelect = (minute) => {
    setMinutes(minute);
  };

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <FlatList
        data={hoursData}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 30,
              fontWeight: hours === item ? 'bold' : 'normal',
            }}
            onPress={() => handleHoursSelect(item)}
          >
            {formatNumber(item)}
          </Text>
        )}
        initialScrollIndex={hours}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        snapToInterval={60}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
      <FlatList
        data={minutesData}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 30,
              fontWeight: minutes === item ? 'bold' : 'normal',
            }}
            onPress={() => handleMinutesSelect(item)}
          >
            {formatNumber(item)}
          </Text>
        )}
        initialScrollIndex={minutes}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        snapToInterval={60}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </View>
  );
};

export default TimePicker;
