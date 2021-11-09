import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { lightPurp } from "./color";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NOTIFICATION_KEY = "MobileFlashCardnotifications";
export const formatSaveDeck = (title) => {
  return {
    [title]: {
      title: title,
      questions: [],
    },
  };
};

export const formatCard = ({ question, answer }) => {
  return {
    question,
    answer,
  };
};

export async function schedulePushNotification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Complete a quiz",
      body: "👋 Don't forget to solve a quiz today!",
    },
    trigger: {
      hour: 19,
      minute: 0,
      repeats: true,
    },
  });
  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}

export function createPushNotification() {
  let token;
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(async (data) => {
      if (data === null) {
        if (Constants.isDevice) {
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
          }
          Notifications.cancelAllScheduledNotificationsAsync();
          token = (await Notifications.getExpoPushTokenAsync()).data;
          if (token) await schedulePushNotification();
        } else {
          alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: lightPurp,
          });
        }
      }
    });
}

export async function clearLocalNotification() {
  const result = await AsyncStorage.removeItem(NOTIFICATION_KEY);
  return Notifications.cancelAllScheduledNotificationsAsync(result);
}
