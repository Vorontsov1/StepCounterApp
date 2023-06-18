import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import useHealthData from './src/hooks/useHealthData';
import {AntDesign} from '@expo/vector-icons';





const STEPS_GOAL = 12000;

export default function App() {
  
      const formatSteps = (steps: number) => {
        const stepsInt = Math.floor(steps); // round down to nearest integer
        const stepsStr = stepsInt.toString();
        return stepsStr.length > 5 ? stepsStr.slice(0, 5) : stepsStr;
      };
  const [date, setDate] = useState(new Date());
  const { steps, distance, flights } = useHealthData(date);
  
    const changeDate = (numDays) => {
      const currentDate = new Date(date); // Create a copy of the current date
      // Update the date by adding/subtracting the number of days
      currentDate.setDate(currentDate.getDate() + numDays);

      setDate(currentDate); // Update the state variable
    };

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <AntDesign
        onPress={() => changeDate(-1)}
          name="left" size={ 24 } color="#c3ff53" />
        <Text style={styles.date}>{"Today is " + date.toDateString()}</Text>
        <AntDesign
          onPress={() => changeDate(1)}
          name="right" size={ 24 } color="#c3ff53" />
      </View>

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
    flexWrap: "wrap",
    marginTop: 100,
  },
  date: {
    color: "white",
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 20,
  
  },
  datePicker: {
    alignItems: 'center',
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
