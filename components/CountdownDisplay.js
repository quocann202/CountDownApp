import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

const CountdownDisplay = ({ time }) => {
  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    let interval;
    if (time <= 10 && time > 0) {
      interval = setInterval(() => {
        setIsRed((prev) => !prev);
      }, 350);
    } else {
      setIsRed(false);
    }
    return () => clearInterval(interval);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const textColor = time <= 10 && time > 0 && isRed ? colors.red : colors.black;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default CountdownDisplay;
