import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const LogInScreen = ({navigation}) => {

    const injectedJavaScript = `
    // Hide unwanted elements
    var element = document.querySelector('header#top');
    if (element) {
      element.style.display = 'none';
    }

    var alternative = document.querySelector('.alternative');
    if (alternative) {
      alternative.style.display = 'none';
    }

    var signin = document.querySelector('h1.box__top');
    if (signin) {
      signin.style.display = 'none';
    }
  `;

  return (
    <View className="bg-[#2c2924] flex-1">
      <View className="h-40 items-center justify-center">
        <Text className="text-white text-2xl font-bold mt-32">Sign in to your Lichess account</Text>
      </View>
      <WebView
        source={{ uri: 'https://lichess.org/login' }}
        injectedJavaScript={injectedJavaScript}
        scrollEnabled={false}
      />
      <TouchableOpacity className="absolute bottom-20 right-10 m-2" onPress={() => navigation.goBack()} >
        <Image source={require('../assets/back.png')} className="h-12 w-12" />
      </TouchableOpacity>
    </View>
  )
}

export default LogInScreen








/* Hide stuff without being able to log out.



/* Hide stuff 1

import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const LogInScreen = ({navigation}) => {

    const injectedJavaScript = `
    // Hide unwanted elements
    var element = document.querySelector('header#top');
    if (element) {
      element.style.display = 'none';
    }

    var alternative = document.querySelector('.alternative');
    if (alternative) {
      alternative.style.display = 'none';
    }

    var signin = document.querySelector('h1.box__top');
    if (signin) {
      signin.style.display = 'none';
    }
  `;

  return (
    <SafeAreaView className="bg-[#161512] flex-1">
      <View className="h-40 items-center justify-center" >
        <Text className="text-white text-2xl font-bold mt-10">Sign in to your Lichess account</Text>
      </View>
      <WebView 
        source={{ uri: 'https://lichess.org/login' }}
        injectedJavaScript={injectedJavaScript}
      />
    </SafeAreaView>
  )
}

export default LogInScreen

*/








/* BASIC LAYOUT



import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const LogInScreen = ({navigation}) => {

  return (
    <SafeAreaView className="bg-[#161512] flex-1">
      <WebView 
        source={{ uri: 'https://lichess.org/login' }}
      />
    </SafeAreaView>
  )
}

export default LogInScreen


*/