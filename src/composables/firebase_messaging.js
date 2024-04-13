import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useFirebaseApp } from "vuefire";
import { useErrorMessage } from "./utilities";

export async function useFCMDeviceToken() {
  try {
    const currentToken = await getToken(getMessaging(useFirebaseApp()), {
      vapidKey:
        "BLUVHObBLjY0xTTE0LAb1sfxqmVHANGWMXCygd3L-JS1MdsKjN430irTnhK7T4SzSwNwODiUkPY1ef_JVhAU4cE",
    });
    if (currentToken) {
      return currentToken;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
}

export function useRequestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}

export function useHandleMessaging(callback) {
  const messaging = getMessaging(useFirebaseApp());
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    callback(payload);
  });
}

export async function useSendPushNotification(token, data) {
  const functions = getFunctions(useFirebaseApp());

  const sendNotification = httpsCallable(functions, "sendNotification");
  try {
    const result = await sendNotification({
      token: token,
      data: data,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
    useErrorMessage("Oops", "Failed sending email.", "top-right")
  }
}
