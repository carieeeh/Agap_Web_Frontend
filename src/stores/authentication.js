import { defineStore } from "pinia";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import router from "@/router";
import { useRandomPassword } from "@/composables/utilities";
import { useUsersCollection } from "@/stores/users";

export const useAuthentication = defineStore("authentication", {
  state: () => ({
    authenticated: false,
    user: null,
    error: null,
  }),
  actions: {
    async createUser(email) {
      const auth = getAuth();

      let password = useRandomPassword();
      try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {user: userCredential.user, password: password};
      } catch (error) {
        console.error(`Error: ${error.message}`, error.code);
      }
    },
    login(data) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          useUsersCollection();
          this.user = userCredential.user;
          this.authenticated = true;
          this.error = null;
          router.push("/app/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          this.error = errorCode;
          console.error(errorCode);
        });
    },
    logout() {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          this.authenticated = false;
          router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  persist: {
    enabled: true,
  },
});
