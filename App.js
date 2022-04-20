// External Libraries
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

function App() {
  // States
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Functions
  const toggleIsActive = () => setIsActive(!isActive);

  function resetStopwatch() {
    setSeconds(0);
    setIsActive(false);
  }

  // Life Cycle
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 0.1);
      }, 100);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={styles.container}>
      <Image source={require('./src/assets/cronometro.png')} />

      <Text style={styles.timer}>{seconds.toFixed(1)}</Text>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={toggleIsActive}>
          <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stylization
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#00aeef',
  },
  timer: {
    position: 'absolute',
    color: '#fff',
    fontSize: 65,
    fontWeight: 'bold',
  },
  buttonArea: {
    flexDirection: 'row',
    marginTop: 10,
    height: 40,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
});

export default App;
