<script setup>
import { inject } from 'vue';

const login = inject('login');
</script>

<template>
    <div class="col-span-3 flex items-center justify-center h-screen w-full bg-primaryRed">
        <div class="bg-white rounded-md w-3/4 p-10">
            <p class="text-4xl font-bold">Welcome back!</p>
            <p class="text-gray-500 py-5">Login into your accout.</p>
            <div>
                <Vueform>
                    <TextElement name="hello_world" label="Email Address" type="email" size="sm" />
                    <TextElement name="hello_world" label="Password" type="password" size="sm" />
                </Vueform>
                <div class="text-sm leading-6">
                    <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> -->
                </div>
            </div>

            <div>
                <button type="submit" @click="login()"
                    class="flex w-full justify-center rounded-md bg-primaryRed px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>