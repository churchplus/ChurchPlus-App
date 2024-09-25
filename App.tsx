/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get('screen');

const SplashScreen = () => {
  return (
    <View style={{ width, height, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Animatable.View
        animation={'zoomInDown'}
        duration={4000}
      >
        <Image source={require('./assets/churchplusblueLogo.png')} style={{ width: width / 2 }} resizeMode='contain' />
      </Animatable.View>
    </View>
  )
}
const AppWrapper = (): React.JSX.Element => {
  const webViewRef = useRef()
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [splash, setsplash] = useState(true)

  const backButtonHandler = () => {
    if (webViewRef.current) webViewRef.current.goBack()
    return true;
  }

  const frontButtonHandler = () => {
    if (webViewRef.current) webViewRef.current.goForward()
  }

  useEffect(() => {
    setTimeout(() => {
      setsplash(false)
    }, 4000);
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler)
    };
  }, []);

  return (
    <View style={styles.appWrapper}>
      {
        splash ? (
          <SplashScreen />
        ) : (
          <WebView
            ref={webViewRef}
            source={{ uri: 'https://my.churchplus.co' }}
            style={styles.webView}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.flexContainer}>
                <ActivityIndicator
                  color='black'
                  size='large'
                />
              </View>
            )}
            onNavigationStateChange={navState => {
              setCanGoBack(navState.canGoBack)
              setCanGoForward(navState.canGoForward)
              setCurrentUrl(navState.url)
            }}
          />
        )
      }
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"#ffffff"}
      />
      <View>
        <AppWrapper />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    backgroundColor: '#ffffff',
    height: Dimensions.get("window").height
  },
  webView: {
    flex: 1
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height
  }
});

export default App;
