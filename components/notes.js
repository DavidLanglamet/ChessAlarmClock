// TODO:
// Make an information page (top right of settings maybe?) with how to use the app (turn on DND...)
// create a landing page
// create a buyMeACoffee account
// MusicProduce alarms and add them
// days streak stat (verify)
// make button clickable areas bigger
// make sure you can't swipe out of the alarm. (from left to right)
// VERY IMPORTANT: No sound bug: switching silent mode off and on again fixes it. Sound needs to be dialed up though.

// DESING ISSUES:
// go back icon (and placement)
// In the settings page the puzzleCount and types dropdown windows are placed through mr-X of the text on the left. Is that the way to go?
// Fix design for different screen sizes.
// in the settings page, the y margin between items is not mathematically correct because of the puzzles dropdown.
// drop down zahlen zentriert. vielleicht schmaler? Farbe ändern? Dropdown fenster zentrieren bzw bis zur mitte
// Profile button gleich positioniert wie go back buttons
// Modal height is set up in a very sketchy way maybe. Before that version it was just className="h-1/4" instead of <TouchableOpacity style={{height: screenHeight/3 - 3*Math.max(0, heightAdjustmentModal)}} onPress={closeModal} />


// FAILED ATTEMPTS:
// turn pieceSound off (changing the html doesn't turn the sound off and there's no native way to turn off webview sound)

// POSSIBLE FEATURES:
// add a little v at the top of the modal to make it clear that you can swipe down and discard changes.

// BUGS:
// weirdness when setting username to nothing.

// DON'T FORGET
// Hello Tinypixel is clickable to go to chess screen
// Does the iphone keyboard actually pop up when changing the username?

// TO TELL:
// HOW TO USE THE APP (do not disturb...)






// GPT result for asynchronous alarms

/*

useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('alarms', JSON.stringify(alarms));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [alarms]);

*/

/*
  useEffect(() => {
    AsyncStorage.getItem('alarmWhilePuzzle').then((value) => {
      if (value !== null) {
        setAlarmWhilePuzzle(JSON.parse(value));
      }
    });

    AsyncStorage.getItem('username').then((value) => {
      if (value !== null) {
        setUsername(value);
      }
    });

    AsyncStorage.getItem('alarms').then((value) => {
      if (value !== null) {
        setAlarms(JSON.parse(value));
      }
    });
  }, []);


*/




















// switch colors  8ada6f     3e9950    47FF2E
// old switch color: #8ada6f

// AlarmSettings links:

// next link is for dropdown picker issues
// https://stackoverflow.com/questions/67573201/react-native-dropdown-picker-how-to-fix-the-dropdown-picker-overlay-on-other-co
// https://blog.logrocket.com/react-native-gesture-handler-swipe-long-press-and-more/
// https://stackoverflow.com/questions/4147046/is-it-possible-to-remove-am-pm-button-from-timepicker
// https://github.com/hoaphantn7604/react-native-element-dropdown
// timePicker for android:
// https://stackoverflow.com/questions/58925515/using-react-native-community-datetimepicker-how-can-i-display-a-datetime-picker
