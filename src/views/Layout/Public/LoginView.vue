<script setup>
import router from '@/router';


function login() {
  router.push({path: '/dashboard'});
}
</script>

<template>
  <div class="relative h-screen w-full">
    <img class="h-20 absolute bottom-20 left-96" src="/assets/images/gif/flood.gif" alt="">
    <img class="h-20 absolute top-10 left-36" src="/assets/images/gif/humanitarian-help.gif" alt="">
    <img class="h-20 absolute top-64 left-1/3" src="/assets/images/gif/fire_building.gif" alt="">
    <img class="h-20 absolute top-80 left-10" src="/assets/images/gif/first-aid-kit.gif" alt="">
    <img class="h-20 absolute top-32 left-64" src="/assets/images/gif/security-guard.gif" alt="">
    <img class="h-20 absolute top-10 left-96" src="/assets/images/gif/charity.gif" alt="">
    <img class="h-20 absolute top-32 left-10" src="/assets/images/gif/ambulance.gif" alt="">
    <img class="h-20 absolute bottom-28 left-48" src="/assets/images/gif/earthquake_colored.gif" alt="">
    <div class="grid grid-cols-5 items-center justify-center h-screen w-full">
      <div class="flex justify-center col-span-2">
        <img class="h-44 " src="/assets/images/red_no_bg_logo.png" alt="">
      </div>
      <div class="col-span-3 flex items-center justify-center h-screen w-full bg-gray-200">
        <div class="bg-white rounded-md w-3/4 p-10">
          <p class="text-4xl font-bold">Welcome back!</p>
          <p class="text-gray-500 py-5">Login into your accout.</p>
          <div>
            <form action="#" method="POST" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input id="email" name="email" type="email" autocomplete="email" required=""
                    class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                  <input id="password" name="password" type="password" autocomplete="current-password" required=""
                    class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">Remember me</label>
                </div>

                <div class="text-sm leading-6">
                  <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> -->
                </div>
              </div>

              <div>
                <button type="submit" @click="login()"
                  class="flex w-full justify-center rounded-md bg-primaryRed px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                  in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
