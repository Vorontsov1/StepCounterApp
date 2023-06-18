import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
  HealthInputOptions,
} from "react-native-health";
import { useEffect, useState } from "react";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";




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

    const timeRangeFilter: TimeRangeFilter = {
      operator: "between",
      startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
      endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
    };

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
      timeRangeFilter: timeRangeFilter,
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
  }, [hasPermissions, date]); // added date here so it will re-run when date changes

  return {
    steps,
    flights,
    distance,
  };
};

export default useHealthData;
