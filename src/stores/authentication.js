import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import router from '@/router';

export const useAuthentication = defineStore('authentication', {
  state: () => ({
    authenticated: false,
    user: null,
    error: null,
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
           this.error = null;
           router.push('/app/dashboard');
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

      signOut(auth).then(() => {
        this.authenticated = false;
        router.push('/')
      }).catch((error) => {
        console.error(error);
      });

    }
  },
  persist: {
    enabled: true,
  }
})
