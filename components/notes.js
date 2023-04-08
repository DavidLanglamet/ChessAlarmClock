// TODO:
// Make Settings in settings page do what they say
// Link a Paypal to donate button
// Produce alarms and link them in app
// VERY IMPORTANT: No sound bug: switching silent mode off and on again fixes it. Sound needs to be diled up though.

// DESING ISSUES:
// In the settings page the puzzleCount and types dropdown windows are placed through mr-X of the text on the left. Is that the way to go?
// Fix design for different screen sizes.
// in the settings page, the y margin between items is not mathematically correct because of the puzzles dropdown.
// drop down zahlen zentriert. vielleicht schmaler? Farbe ändern?
// Profile button gleich positioniert wie go back buttons

// FAILED ATTEMPTS:
// stop alarmSound
// turn pieceSound off (changing the html doesn't turn the sound off)

// POSSIBLE FEATURES:
// add a little v at the top of the modal to make it clear that you can swipe down and discard changes.


























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









import { View, Text, Dimensions } from 'react-native';
import React from 'react';

const ChessScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth / 8;

  const renderSquare = (isBlack, piece) => {
    const squareColor = isBlack ? 'black' : 'white';
    const pieceColor = isBlack ? 'white' : 'black';
    const pieceSymbol = piece ? piece : '';
    return (
      <View style={{
        backgroundColor: squareColor,
        width: squareSize,
        height: squareSize,
        transform: [{ rotate: '90deg' }]
      }}>
        <Text style={{
          fontSize: squareSize/2,
          color: pieceColor,
          transform: [{ rotate: '-90deg' }]
        }}>{pieceSymbol}</Text>
      </View>
    );
  };

  const renderRow = (rowIndex) => {
    const isEvenRow = rowIndex % 2 === 0;
    const piece = rowIndex === 0 ? '♜' : (rowIndex === 1 ? '♞' : (rowIndex === 6 ? '♘' : (rowIndex === 7 ? '♖' : null)));
    return (
      <View style={{ flexDirection: 'row' }}>
        {renderSquare(isEvenRow, piece)}
        {renderSquare(!isEvenRow, '♟')}
        {renderSquare(isEvenRow)}
        {renderSquare(!isEvenRow)}
        {renderSquare(isEvenRow)}
        {renderSquare(!isEvenRow)}
        {renderSquare(isEvenRow, '♙')}
        {renderSquare(!isEvenRow, '♗')}
      </View>
    );
  };
  
  

  const renderBoard = () => {
    return (
      <View>
        {renderRow(7)}
        {renderRow(6)}
        {renderRow(5)}
        {renderRow(4)}
        {renderRow(3)}
        {renderRow(2)}
        {renderRow(1)}
        {renderRow(0)}
      </View>
    );
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {renderBoard()}
    </View>
  );
};

export default ChessScreen;
