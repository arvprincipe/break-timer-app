import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Audio } from 'expo-av'
import { StyleSheet, Text, View, SafeAreaView, Platform, Touchable, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import Timer from './components/Timer';

const colors = ['#50c878', '#f0e68c', '#ff6347']

export default function App() {
  const [isWorking, setIsWorking] = useState<boolean>(false)
  const [time, setTime] = useState<number>(25 * 60)
  const [currentTime, setCurrentTime] = useState<'POMO' | 'SHORT' | 'BREAK'>('POMO');
  const [isActive, setIsActive] = useState<boolean>(false)

  function handleStartStop() {
    playSound()
    setIsActive((prev) => !prev);
  }

  const playSound = useCallback(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/Punch.wav')
      )
      await sound.playAsync()
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    let interval: any = null;
    console.log('interval: ', interval);
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (interval !== null) {
      if (interval !== null) {
        clearInterval(interval);
      }
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking(prev => !prev)
      setTime(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval);
  }, [isActive, time])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 30 : 0
      }}>
        <Text style={styles.text}>Pomodoro</Text>

        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer
          time={time}
        />
        <StatusBar style="auto" />
        <TouchableOpacity
          onPress={handleStartStop}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isActive ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    color: 'white'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});

