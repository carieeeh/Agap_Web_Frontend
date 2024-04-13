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

export async function useSendPushNotification() {
  const functions = getFunctions(useFirebaseApp());

  const sendNotification = httpsCallable(functions, "sendNotification");
  try {
    const result = await sendNotification({
      token: "dAs3sPqF8azWBCuwV7eGlL:APA91bHIbDGB07sKMVzp7tg9YSBboqO5wfh_AgJk8lOggx1L5uJUyh3x2pr2pBVhHvnan-tjbYDK3W2IoSsCdlYsAhQmOlCpgNJos1a1QhU2f3_dAbScEgkzpxzqXysoA7TXGbyekWBE",
      data: {
        title: "test",
        body: "Test body",
        test: "data",
        success: "true",
        number: "123456789",
      }
    });
    console.log(result);
  } catch (error) {
    console.error(error);
    useErrorMessage("Oops", "Failed sending email.", "top-right")
  }
}
