import { View, Text, StyleSheet, Pressable } from 'react-native';

type HeaderProps = {
  currentTime: 'POMO' | 'SHORT' | 'LONG';
  setCurrentTime: (time: 'POMO' | 'SHORT' | 'LONG') => void;
  setTime: (time: number) => void;
}

const options = ['Pomodoro', 'Short Break', 'Long Break']

export default function Header(props: HeaderProps) {
  const { setTime, setCurrentTime, currentTime } = props

  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
  }

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(index)}
          style={[styles.item, currentTime !== index ? { borderColor: "transparent" } : {}]}
        >
          <Text>{option}</Text>
        </Pressable>
      ))
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  item: {
    width: '33%',
    borderWidth: 3,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'white',
  }
});
