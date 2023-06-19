import React, { useEffect, useState }  from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SoundContext = React.createContext();

export const SoundProvider = ({ children }) => {
  const [selectedAlarmSound, setSelectedAlarmSound] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('selectedAlarmSound').then((value) => {
      if (value !== null) {
        setSelectedAlarmSound(value);
      }
    });
  }, []);

  const [sound, setSound] = React.useState();

  const playSound = async () => {
    const latestAlarmSound = await AsyncStorage.getItem('selectedAlarmSound');
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });
      let soundFile;
      switch (latestAlarmSound) {
        case '1':
          soundFile = require('../assets/Alarm1.mp3');
          break;
        case '2':
          soundFile = require('../assets/Alarm2.mp3');
          break;
        // Add more cases as necessary
        default:
          soundFile = require('../assets/Alarm1.mp3');
          break;
      }

      const { sound } = await Audio.Sound.createAsync(
        soundFile,
        { shouldPlay: true, isLooping: true } // Set shouldPlay and isLooping options
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.replayAsync(); // Replay the sound when it finishes
        }
      });

      setSound(sound);
    } catch (error) {
      console.log(error);
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stopAsync();
      sound.unloadAsync();
      setSound(null);
    }
  };

  return (
    <SoundContext.Provider value={{ sound, setSound, playSound, stopSound }}>
      {children}
    </SoundContext.Provider>
  );
};