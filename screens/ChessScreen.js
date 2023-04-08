import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SoundContext } from "../components/SoundContext";

const ChessScreen = () => {

  const navigation = useNavigation();
  const [key, setKey] = useState(0);
  const webviewRef = useRef(null);
  const [selectedPuzzleCount, setSelectedPuzzleCount] = useState('1');
  const [selectedType, selectType] = useState("https://lichess.org/training/mateIn1");

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
  }, []);

  const onMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log(message);
    
    const text = message.replace(/<[^>]*>/g, ''); // Extract text content from HTML
  
    // Count the number of occurrences of "true" in the message
    const count = (message.match(/true/gi) || []).length;

    // If there are selectedPuzzleCount occurrences of "true", call the turnAlarmOff function
    if (count == selectedPuzzleCount) {
      turnAlarmOff();
    }

    if (message === 'clearCache') {
      webviewRef.current.injectJavaScript('window.location.reload();');
    }
  };

  const { stopSound } = useContext(SoundContext);

  const turnAlarmOff = () => {
    console.log("Turning alarm off...");
    if (stopSound) {
      stopSound();
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
