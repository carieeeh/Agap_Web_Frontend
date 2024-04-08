<script lang="ts" setup>
import LoginLogo from "@/views/Layout/Public/LoginLogo.vue"
import LoginForm from "@/views/Layout/Public/LoginForm.vue"

</script>

<template>
  <div class="h-screen w-full">
    <div class="grid grid-cols-1 lg:grid-cols-5 items-center justify-center h-screen w-full">
      <LoginLogo class="hidden lg:block" />
      <LoginForm class="z-10"/>
    </div>
  </div>
</template>
