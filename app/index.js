import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import CountdownDisplay from '../components/CountdownDisplay';
import colors from '../constants/Colors';

const App = () => {
  const [inputMinutes, setInputMinutes] = useState('0');
  const [inputSeconds, setInputSeconds] = useState('0');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalRef.current);
      if (isRunning) {
        Alert.alert('Time is up!');
        setIsRunning(false);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleStart = () => {
    const totalSeconds = parseInt(inputMinutes, 10) * 60 + parseInt(inputSeconds, 10);
    setTime(totalSeconds);
    setIsRunning(true);
  };

  const handlePauseContinue = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setInputMinutes('0');
    setInputSeconds('0');
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Please set a countdown timer!</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputMinutes}
          onChangeText={setInputMinutes}
          placeholder="Minutes"
          placeholderTextColor={colors.lightGray}
        />
        <Text style={styles.comma}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputSeconds}
          onChangeText={setInputSeconds}
          placeholder="Seconds"
          placeholderTextColor={colors.lightGray}
        />
      </View>
      <CountdownDisplay time={time} />
      <View style={styles.buttonRow}>
        <ButtonComponent title="Start" onPress={handleStart} />
        <ButtonComponent title={isRunning ? 'Pause' : 'Resume'} onPress={handlePauseContinue} />
        <ButtonComponent title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 30,
  },
  instructionText: {
    fontSize: 20,
    color: colors.primary,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  comma: {
    justifyContent: 'center',
    fontSize: 30,
    color: colors.primary,
    shadowColor: colors.black,
    fontWeight: '400',
  },

  input: {
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 10,
    width: '40%',
    padding: 15,
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
});

export default App;
