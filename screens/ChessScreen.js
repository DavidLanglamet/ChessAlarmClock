import { AppState, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SoundContext } from "../components/SoundContext";

const ChessScreen = ({ route }) => {

  const isFocused = useIsFocused();
  const { alarmWhilePuzzle } = route.params;
  const navigation = useNavigation();
  const [key, setKey] = useState(0);
  const webviewRef = useRef(null);
  const [selectedPuzzleCount, setSelectedPuzzleCount] = useState('1');
  const [selectedType, selectType] = useState("https://lichess.org/training/mateIn1");
  const [appState, setAppState] = useState(AppState.currentState);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [hasTurnedAlarmOff, setHasTurnedAlarmOff] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('selectedPuzzleCount').then((value) => {
      if (value !== null) {
        setSelectedPuzzleCount(value);
      }
    });

    AsyncStorage.getItem('selectedType').then((value) => {
      if (value !== null) {
        selectType(value);
      }
    });

    AsyncStorage.getItem('puzzlesSolved').then((value) => {
      if (value !== null) {
        setPuzzlesSolved(JSON.parse(value));
      }
    });
  }, []);

  const { stopSound } = useContext(SoundContext);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && alarmWhilePuzzle === false && isFocused && appState === "active") {
      if (stopSound) {
        console.log(alarmWhilePuzzle);
        stopSound();
      }
    }
    
    return () => {
      mounted = false;
    };
  }, [alarmWhilePuzzle, stopSound, isFocused, appState]);
  
  const onMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log(message);
  
    const text = message.replace(/<[^>]*>/g, ''); // Extract text content from HTML
  
    // Count the number of occurrences of "true" in the message
    const count = (message.match(/true/gi) || []).length;
  
    if (!hasTurnedAlarmOff && count == selectedPuzzleCount) {
      setHasTurnedAlarmOff(true); // Set flag to true
      turnAlarmOff();
    }
  
    if (message === 'clearCache') {
      webviewRef.current.injectJavaScript('window.location.reload();');
    }
  };
  

  const turnAlarmOff = async () => {
    console.log("Turning alarm off...");
    if (stopSound) {
      stopSound();
    }
  
    setPuzzlesSolved((prevCount) => prevCount + 1);
  
    // Get current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes and seconds to 0 to compare just dates

    let lastPuzzleDate = await AsyncStorage.getItem('lastPuzzleDate');
    if (lastPuzzleDate !== null) {
      lastPuzzleDate = new Date(JSON.parse(lastPuzzleDate));
      const diffDays = Math.round((currentDate - lastPuzzleDate) / (1000 * 60 * 60 * 24)); // Calculate difference in days

      let streak = await AsyncStorage.getItem('daysStreak');
      streak = streak !== null ? JSON.parse(streak) : 0;

      // If the difference is 1, increment the streak. If more, reset the streak
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 0;
      } else if (streak == 0) {
        streak = 1;
      }

      try {
        await AsyncStorage.setItem('daysStreak', JSON.stringify(streak));
      } catch (e) {
        console.error(e);
      }
    }

    // Save current date as lastPuzzleDate
    try {
      await AsyncStorage.setItem('lastPuzzleDate', JSON.stringify(currentDate.toString()));
    } catch (e) {
      console.error(e);
    }

    try {
      await AsyncStorage.setItem('puzzlesSolved', JSON.stringify(puzzlesSolved + 1));
    } catch (e) {
      console.error(e);
    }
  
    navigation.navigate("MemeScreen");
  };
  

  const injectedJavaScript = `
    // Hide unwanted elements
    var element = document.querySelector('header#top');
    if (element) {
      element.style.display = 'none';
    }

    // SHOW THIS? TO SEE SOLUTION AND STUFF.
    /*
    var puzzleTools = document.querySelector('.puzzle__tools');
    if (puzzleTools) {
      puzzleTools.style.display = 'none';
    }
    */

    // PUZZLES SOLVED AND FAILED
    /*
    var puzzleSession = document.querySelector('.puzzle__session');
    if (puzzleSession) {
      puzzleSession.style.display = 'none';
    }
    */

    var puzzleSide = document.querySelector('aside.puzzle__side');
    if (puzzleSide) {
      puzzleSide.style.display = 'none';
    }

    var puzzleSessionDiv = document.querySelector('.puzzle__session');
    var puzzleSessionContents = puzzleSessionDiv.innerHTML;
    window.ReactNativeWebView.postMessage(puzzleSessionContents);

    // Add event listener to puzzleSessionDiv that listens for changes to its content
    puzzleSessionDiv.addEventListener('DOMSubtreeModified', function() {
    puzzleSessionContents = puzzleSessionDiv.innerHTML;
    window.ReactNativeWebView.postMessage(puzzleSessionContents);
    });

    var body = document.querySelector('body');
    if (body) {
      body.className = 'dark Woodi Basic coords-in zenable playing online blue2';
      // body.setAttribute("data-sound-set", "silent");
  }
  `;

  const clearCacheAndReset = () => {
    webviewRef.current.postMessage('clearCache');
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <SoundContext.Consumer>
      {({ stopSound }) => (
      <SafeAreaView className="bg-[#161512] flex-1">
        <View className="h-12 items-center justify-center">
          <Text className="text-white text-base">
            Solve the puzzle to stop the alarm
          </Text>
        </View>
        <WebView
          ref={webviewRef}
          key={key}
          source={{ uri: selectedType }}
          injectedJavaScript={injectedJavaScript}
          scrollEnabled={false}
          onMessage={onMessage}
          incognito={true}
        />
      </SafeAreaView>
      )}
    </SoundContext.Consumer>
  );
};

export default ChessScreen;
