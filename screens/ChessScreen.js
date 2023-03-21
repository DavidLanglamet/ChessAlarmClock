import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const ChessScreen = () => {
    
  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <WebView
        source={{ uri: 'https://lichess.org/training/daily' }}
        injectedJavaScript={`
          document.getElementById('header').style.display = 'none';
        `}
      />
    </SafeAreaView>
  )
}

export default ChessScreen




/* GPT 4 answer to get only board

import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const ChessScreen = () => {
  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <WebView
        source={{ uri: 'https://lichess.org/training/daily' }}
        injectedJavaScript={`
          document.querySelectorAll('.site-title, .site-title-img, .puzzle__side, .puzzle__side__user, .puzzle__side__main, .puzzle__side__info, .puzzle__side__reload, .puzzle__side__show, .cg-coords').forEach(element => {
            element.style.display = 'none';
          });
          document.querySelector('.puzzle__board').style.margin = '0 auto';
          true;
        `}
      />
    </SafeAreaView>
  );
};

export default ChessScreen;

*/




/* Progress? only showing black screen

import { View, Text, SafeAreaView } from 'react-native';
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

const ChessScreen = () => {

  const webViewRef = useRef(null);

  const injectJavaScript = `
    const mainBoard = document.querySelector('div.puzzle__board.main-board');
    const elementsToHide = document.querySelectorAll(':not(div.puzzle__board.main-board)');

    // Hide all elements except the main board
    elementsToHide.forEach((el) => {
      el.style.display = 'none';
    });

    // Make the main board take up the full screen
    mainBoard.style.width = '100%';
    mainBoard.style.height = '100%';
    mainBoard.style.position = 'absolute';
  `;

  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <WebView
        source={{ uri: 'https://lichess.org/training/daily' }}
        onLoad={() => {
          webViewRef.current.injectJavaScript(injectJavaScript);
        }}
        ref={webViewRef}
      />
    </SafeAreaView>
  );
};
  

export default ChessScreen

*/









/* OTHER GPT 4 Solution:

import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import cheerio from 'cheerio';



  const ChessScreen = () => {
    const [content, setContent] = useState(null);

    const fetchLichessDailyPuzzle = async () => {
        try {
          const response = await axios.get('https://lichess.org/training/daily');
          const $ = cheerio.load(response.data);
      
          const cssUrls = [];
          $('link[rel="stylesheet"]').each((_, el) => {
            cssUrls.push($(el).attr('href'));
          });
      
          const scriptUrls = [];
          $('script[src]').each((_, el) => {
            scriptUrls.push($(el).attr('src'));
          });
      
          const puzzleHtml = $('.puzzle__board.main-board').html();
          return { puzzleHtml, cssUrls, scriptUrls };
        } catch (error) {
          console.error('Error fetching Lichess Daily Puzzle:', error);
          return null;
        }
      };
  
    useEffect(() => {
      const fetchPuzzle = async () => {
        const data = await fetchLichessDailyPuzzle();
        if (data) {
          const { puzzleHtml, cssUrls, scriptUrls } = data;
  
          const cssLinks = cssUrls
            .map((url) => `<link rel="stylesheet" href="${url}">`)
            .join('\n');
  
          const scriptTags = scriptUrls
            .map((url) => `<script src="${url}"></script>`)
            .join('\n');
  
            const htmlTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              ${cssLinks}
              <style>
                html, body {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  width: 100%;
                }
                .puzzle__board.main-board {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  width: 100%;
                }
              </style>
            </head>
            <body>
              <div class="puzzle__board main-board">${puzzleHtml}</div>
              ${scriptTags}
            </body>
            </html>
          `;
          
  
          setContent(htmlTemplate);
        }
      };
  
      fetchPuzzle();
    }, []);
  
    if (content) {
      return (
        <WebView
          originWhitelist={['*']}
          source={{ html: content, baseUrl: 'https://lichess.org/' }}
          style={{ flex: 1 }}
        />
      );
    } else {
      return null;
    }
  };
  
  export default ChessScreen;
  
*/
















/* DEFAULT

import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const ChessScreen = () => {
    
  return (
    <SafeAreaView className="bg-[#303840] flex-1">
      <WebView
        source={{ uri: 'https://lichess.org/training/daily' }}
        injectedJavaScript={`
          document.getElementById('header').style.display = 'none';
        `}
      />
    </SafeAreaView>
  )
}

export default ChessScreen

*/