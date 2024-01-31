import { StyleSheet, Text, View } from "react-native";

export default function Timer({ time }: { time: number }) {
  // const formattedTime = `${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
  const formattedTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedTime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center'
  },
  text: {
    fontSize: 80,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333'
  }
})