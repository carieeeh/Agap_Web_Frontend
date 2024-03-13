import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { useFireStoreDb } from "@/firebase";

export const usUsersCollection = defineStore("users", {
  state: () => {
    return {
      users: [],
    };
  },
  getters: {
    getUserByUid: (state) => {
        return (uid) => state.users.find(user => user.user_uid == uid)
    },
    getUserFullName: () => {
        return (uid) => this.getUserByUid(uid).first_name + " " + this.getUserByUid(uid).last_name
    },
  },
  actions: {
    getUsers() {
      this.users = useCollection(
        collection(useFireStoreDb, "/agap_collection/staging/users")
      );
    },
  },
});
