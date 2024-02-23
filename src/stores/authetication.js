import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from '@/router';

export const useAuthentication = defineStore('authentication', {
  state: () => ({
    authenticated: false,
    user: null,
  }),
  actions: {
    login(data) {
      console.log(data.email, data.password)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          console.log(userCredential);
           this.user = userCredential.user;
           console.log(auth);
           this.authenticated = true;
           router.push('/app/dashboard');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorMessage, errorCode);
        });
    },
    logout() {
      this.authenticated = false;
      router.push('/')
    }
  },
  persist: {
    enabled: true,
  }
})
