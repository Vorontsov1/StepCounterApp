import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';





export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Value label="Steps" value="1219" />
        <Value label="Distance" value="0,56km" />
        <Value label="Flights Climbed" value="11" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  values: {
    flexDirection: "row",
    gap: 55, 
    flexWrap: 'wrap',
  },
});
