import React from 'react';
import { Audio } from 'expo-av';

export const SoundContext = React.createContext();

export const SoundProvider = ({ children }) => {
  const [sound, setSound] = React.useState();

  const playSound = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/Hello.mp3'),
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
