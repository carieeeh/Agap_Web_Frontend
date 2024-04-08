<script setup>
import { ref } from 'vue';
import { useUsersCollection } from '@/stores/users';
import SlideOver from '@/views/components/SlideOver/SlideOver.vue';
import CustomButton from '@/views/components/Buttons/CustomButton.vue';

const sliderIsOpen = ref(false);
const users = useUsersCollection();
const selectedUser = ref(null);

function editUser(uid) {
  sliderIsOpen.value = true;
  selectedUser.value = users.getUserByUid(uid);
  }

</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Manage users</h1>
        <p class="mt-2 text-sm text-gray-700">
          View, update users details or approve rescuers registration.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button"
          class="block rounded-md bg-primaryRed px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add user
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            {{ users.users }}
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in users.users" :key="user.uid">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ users.getUserFullName(user.uid) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.email ?? "No email registered" }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.role }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.status }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-primaryRed hover:text-indigo-900" @click="editUser(user.uid)">Edit
                      <span class="sr-only">,
                        {{ users.getUserFullName(user.uid) }}
                      </span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <SlideOver :isOpen="sliderIsOpen" @close="sliderIsOpen = false"
              :title="users.getUserFullName(selectedUser?.uid)">
              <template v-slot:content>
                <p class="pb-4">User details</p>
                <p class="pb-4 text-sm">Status : {{ selectedUser.status }}</p>
                <div>
                  <input class="bg-green" type="text">
                </div>
                <div v-if="false" class="flex justify-end mt-5 gap-3">
                  <CustomButton type="accept" class="bg-green-400 text-white" />
                  <CustomButton type="cancel" class="bg-gray-400 text-white" />
                </div>
              </template>
            </SlideOver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
