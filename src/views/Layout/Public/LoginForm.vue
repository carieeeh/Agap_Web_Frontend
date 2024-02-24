<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useAuthentication } from '@/stores/authentication'

const form$ = ref(null);
const auth = useAuthentication();
const passwordInputType = ref('password');

const showPassword = (event) => {
    passwordInputType.value = event.target.checked ? 'text' : 'password';
}
onMounted(() => {

});
</script>

<template>
    <div class="col-span-3 flex items-center justify-center h-screen w-full bg-primaryRed">
        <div class="bg-white rounded-md w-3/4 p-10">
            <p class="text-4xl font-bold">Welcome back!</p>
            <p class="text-gray-500 py-5">Login into your account.</p>
            <p v-if="auth.error == 'auth/invalid-credential'" class="pb-5 text-xs text-red-500">You have enter wrong email or password.</p>
            <div>
                <Vueform ref="form$" :display-errors="false">
                    <TextElement name="email" rules="required|email" label="Email" type="email" size="sm" />
                    <TextElement name="password" label="Password" :inputType="passwordInputType" type="text" size="sm" />
                    <CheckboxElement @click="showPassword($event)" size="sm" class="w-fit whitespace-nowrap" name="showPwd"
                        text="Show password" />
                </Vueform>
                <div>
                </div>
                <div class="text-sm leading-6">
                    <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> -->
                </div>
            </div>

            <div>
                <button type="submit" @click="auth.login(form$.data)"
                    class="flex w-full justify-center rounded-md bg-primaryRed px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>