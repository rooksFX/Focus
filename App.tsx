// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { data } from './src/context/mocks';

import Tasks from './src/views/tasks/Tasks';

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <StatusBar backgroundColor='#34cfff' />
      <View style={styles.title}>
        <Text style={styles.titleText}>F O C U S</Text>
        <Text style={styles.titleText}>EXPO SNACK TEST</Text>
      </View>
      <Tasks />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'center',
    paddingTop: 25,
    backgroundColor: '#34cfff',
    height: 200
  },
  titleText: {
    fontWeight: '700',
    fontSize: 28,
    color: '#fff',
  },
  app: {
    flex: 1,
    // backgroundColor: '#e7e7e7',
    backgroundColor: '#34cfff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});
