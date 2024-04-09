import { getMessaging, getToken } from "firebase/messaging";
import { useFirebaseApp } from "vuefire";

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
