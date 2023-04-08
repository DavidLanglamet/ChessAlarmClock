import React from 'react';
import { Audio } from 'expo-av';

export const SoundContext = React.createContext();

export const SoundProvider = ({ children }) => {
  const [sound, setSound] = React.useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Hello.mp3')
    );
    setSound(sound);
    await sound.playAsync();
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
