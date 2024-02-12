<script lang="ts" setup>
import LoginLogo from "@/views/Layout/Public/LoginLogo.vue"
import LoginForm from "@/views/Layout/Public/LoginForm.vue"
import router from "@/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { provide } from "vue";

const auth = getAuth();

const login = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential);
  })
  .catch((error) => {
    console.error(error.code + ": " + error.message);
  });
  router.push({ path: "/app/dashboard" });
}

provide("login", login);
</script>

<template>
  <div class="h-screen w-full">
    <div class="grid grid-cols-5 items-center justify-center h-screen w-full">
      <LoginLogo />
      <LoginForm />
    </div>
  </div>
</template>
