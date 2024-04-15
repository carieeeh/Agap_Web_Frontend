import { defineStore } from "pinia";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import router from "@/router";
import { useErrorMessage, useRandomPassword, useSuccessMessage } from "@/composables/utilities";

export const useAuthentication = defineStore("authentication", {
  state: () => ({
    authenticated: false,
    user: null,
    error: null,
  }),
  actions: {
    async createUser(email) {
      let password = useRandomPassword();
      try{
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        return {user: userCredential.user, password: password};
      } catch (error) {
        console.error(`Error: ${error.message}`, error.code);
      }
    },
    login(data) {
      setPersistence(getAuth(), browserSessionPersistence)
      signInWithEmailAndPassword(getAuth(), data.email, data.password)
        .then((userCredential) => {
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
      signOut(getAuth())
        .then(() => {
          this.authenticated = false;
          router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async resetPassword(email) {
      try {
        await sendPasswordResetEmail(getAuth(), email)
        useSuccessMessage("Success", "Check your email,\n to reset your password", "top-right");
      } catch (error) {
        useErrorMessage("Oops", `Failed sending email. code: ${error.code}`, "top-right");
      }
    }
  },
  persist: {
    enabled: true,
  },
});
