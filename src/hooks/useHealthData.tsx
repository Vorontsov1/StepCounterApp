import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
  HealthInputOptions,
} from "react-native-health";
import { useEffect, useState } from "react";



const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
} as HealthKitPermissions;

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  AppleHealthKit.isAvailable(() => {});
  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log("Error getting permissions");
        return;
      }
      setHasPermissions(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) return;

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };



    AppleHealthKit.getStepCount(options, (error, results) => {
      if (error) {
        console.log("Error getting steps");
        return;
      }
      setSteps(results.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (error, results) => {
      if (error) {
        console.log("Error getting flights");
        return;
      }
      setFlights(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (error, results) => {
      if (error) {
        console.log("Error getting flights");
        return;
      }
      setDistance(results.value);
    });
  }, [hasPermissions]);

  return {
    steps,
    flights,
    distance,
  };
};

export default useHealthData;
