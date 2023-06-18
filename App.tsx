import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import useHealthData from './src/hooks/useHealthData';



const STEPS_GOAL = 12000;

export default function App() {
      const formatSteps = (steps: number) => {
        const stepsInt = Math.floor(steps); // round down to nearest integer
        const stepsStr = stepsInt.toString();
        return stepsStr.length > 5 ? stepsStr.slice(0, 5) : stepsStr;
      };
  
  const {steps, distance, flights } = useHealthData(new Date(2023, 5, 18));

  return (
    <View style={styles.container}>
      <RingProgress
        radius={150}
        strokeWidth={50}
        progress={steps / STEPS_GOAL}
      />
      <View style={styles.values}>
        <Value label="Steps" value={formatSteps(steps)} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
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
    marginTop: 100,
  },
});
