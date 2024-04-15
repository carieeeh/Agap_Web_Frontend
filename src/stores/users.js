import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { useAuthentication } from "@/stores/authentication";
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useFireStoreDb } from "@/firebase";
import { useSendEmail } from "@/composables/emails";
import { useFCMDeviceToken } from "@/composables/firebase_messaging";
import { useErrorMessage, useSuccessMessage } from "@/composables/utilities";

export const useUsersCollection = defineStore("users", {
  state: () => {
    return {
      users: [],
      isLoading: false,
    };
  },
  getters: {
    getUserByUid: (state) => {
      return (uid) => state.users.find((user) => user.uid == uid);
    },
    getUserFullName: (state) => (uid) => {
      const user = state.users.find((user) => user.uid == uid);
      return user ? `${user.first_name} ${user.last_name}` : "Unknown";
    },
    filterUsersByRole: (state) => (role) =>
      state.users.filter((user) => user.role == role),
    getUserFCMToken: (state) => (uid) =>
      state.users.find((user) => user.uid == uid)["fcm_token"] ?? "no token",
  },
  actions: {
    getUsers() {
      this.users = useCollection(
        collection(useFireStoreDb, "/agap_collection/staging/users")
      );
    },
    async createAdmin(data) {
      this.isLoading = true;

      try {
        const user = await useAuthentication().createUser(data.email.value);

        const mapData = {};

        Object.keys(data).forEach((key) => {
          mapData[key] = data[key].value ?? "";
        });
        mapData["uid"] = user.user.uid;

        await addDoc(
          collection(useFireStoreDb, "/agap_collection/staging/users"),
          mapData
        );
        console.log(user);

        useSendEmail(
          "AGAP Account Creation.",
          data.first_name.value,
          data.email.value,
          `AGAP Team Created an account for you, 
          You can use this account to login in: 
          https://agap-f4c32.web.app/
          \nEmail : ${data.email.value} 
          Temporary Password : ${user.password}`
        );
        useSuccessMessage("Success", "User created.", "top-right");
      } catch (error) {
        console.error(error);
        useErrorMessage("Oops", "User create failed.", "top-right");
      } finally {
        this.isLoading = false;
      }

      return "User account successfully created.";
    },
    async updateUserDetails(data) {
      this.isLoading = true;
      console.log(data);
      const mapData = {};

      Object.keys(data).forEach((key) => {
        mapData[key] = data[key].value ?? "";
      });

      try {
        const docRef = doc(
          useFireStoreDb,
          "/agap_collection/staging/users",
          data.id.value
        );
        await setDoc(docRef, mapData);
        useSuccessMessage("Success", "User details updated.", "top-right");
      } catch (error) {
        console.error(error);
        useErrorMessage("Oops", "User details update failed.", "top-right");
      } finally {
        this.isLoading = false;
      }
    },
    async updateUserFCMToken(uid) {
      if (this.users.length > 0) {
        try {
          const userDoc = this.getUserByUid(uid);
          const fcmToken = await useFCMDeviceToken();
          const docRef = doc(
            useFireStoreDb,
            "/agap_collection/staging/users",
            userDoc.id
          );
          await updateDoc(docRef, { fcm_token: fcmToken });
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
});
