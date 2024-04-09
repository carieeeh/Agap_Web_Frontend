<script setup>
import { ref, reactive } from 'vue';
import { useAuthentication } from '@/stores/authentication'
import InputForm from '@/views/components/Inputs/InputForm.vue';
import CheckboxInput from '@/views/components/Inputs/CheckboxInput.vue';

const auth = useAuthentication();
const passwordInputType = ref('password');
const form = reactive({ email: '', password: '', });
const showPassword = (event) => {
    passwordInputType.value = event ? 'text' : 'password';
}

</script>

<template>
    <div class="col-span-3 m-auto lg:flex items-center justify-center h-screen w-full bg-primaryRed">
        <div class="h-44 lg:hidden">
            <img class="h-32 m-auto z-10" src="/assets/images/white_no_bg_logo.png" alt="" />
        </div>
        <div class="bg-white rounded-md w-3/4 p-10 mx-auto">
            <p class="text-4xl font-bold">Welcome back!</p>
            <p class="text-gray-500 py-5">Login into your account.</p>
            <p v-if="auth.error == 'auth/invalid-credential'" class="pb-5 text-xs text-red-500">You have enter wrong
                email or password.</p>
            <div>
                <div>
                    <InputForm label="Email" type="email" :rules="['required']" v-model="form.email"/>
                    <InputForm label="Password" :type="passwordInputType" :rules="['required']" v-model="form.password" />
                    <CheckboxInput label="Show password" @update:modelValue="showPassword($event)"/>
                </div>
                <div class="text-sm leading-6">
                    <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> -->
                </div>
            </div>

            <div>
                <button type="submit" @click="auth.login(form)"
                    class="flex w-full justify-center rounded-md bg-primaryRed px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>