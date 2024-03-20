import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { useFireStoreDb } from "@/firebase";

export const useUsersCollection = defineStore("users", {
  state: () => {
    return {
      users: [],
    };
  },
  getters: {
    getUserByUid: (state) => {
      return (uid) => state.users.find((user) => user.user_uid == uid);
    },
    getUserFullName: (state) => (uid) => {
      const user = state.users.find((user) => user.user_uid == uid);
      return  user ? `${user.first_name} ${user.last_name}` : 'Unknown';
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
