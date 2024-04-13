<script setup>
import { ref, reactive } from 'vue';
import { useUsersCollection } from '@/stores/users';
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline';
import SlideOver from '@/views/components/SlideOver/SlideOver.vue';
import CustomButton from '@/views/components/Buttons/CustomButton.vue';
import DropdownList from '@/views/components/Dropdown/DropdownList.vue';
import InputForm from '@/views/components/Inputs/InputForm.vue';

const sliderIsOpen = ref(false);
const users = useUsersCollection();
const selectedUser = ref(null);
const isAdd = ref(false);

const statusList = ["pending", "accepted", "deactivated"];
const form = reactive({
  id: { value: '' },
  uid: { value: '' },
  first_name: { value: '', label: 'First name' },
  middle_name: { value: '', label: 'Middle name' },
  last_name: { value: '', label: 'Last name' },
  address: { value: '', label: 'Address' },
  email: { value: '', label: 'Email' },
  contact_number: { value: '', label: 'Contact number', disabled: true },
  eme_contact_number: { value: '', label: 'Emergency contact number' },
  status: {value: ''},
  role: { value: '', label: 'User role', disabled: true }
});

function editUser(uid) {
  sliderIsOpen.value = true;
  selectedUser.value = users.getUserByUid(uid);
  console.log(uid)
  console.log(selectedUser.value)
  Object.keys(form).forEach(key => {
    form[key].value = selectedUser.value[key];
  })
}

function closeSlider() {
  sliderIsOpen.value = false;
  isAdd.value = false;
  Object.keys(form).forEach(key => {
    form[key].value = '';
  });
}

function addUser() {
  isAdd.value = true;
  sliderIsOpen.value = true;
  form.role.value = 'admin';
  form.contact_number.disabled = false;
  form.status.value = "accepted"; 
}

function selectStatus(event) {
  const item = event.item;
  form.status.value = item;
}

async function submit() {
  isAdd.value ? await users.createAdmin(form) : await users.updateUserDetails(form)
  sliderIsOpen.value = false ;
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
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none z-10">
        <button class="bg-red-500 rounded-md p-2 text-sm text-white hover:bg-red-600" @click="addUser()">
          Add user
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
            <SlideOver :isOpen="sliderIsOpen" @close="closeSlider()" title="Edit user details">
              <template v-slot:content>
                <DropdownList :list="statusList" :default="statusList.findIndex(item => item === form.status.value)" label="Account status" @select="selectStatus($event)" />
                <div v-for="input in Object.keys(form)" :key="input">
                  <InputForm v-if="form[input].label" type="text" :label="form[input].label" v-model="form[input].value"
                    :disabled="form[input].disabled" />
                </div>
                <div class="flex justify-end mt-5 gap-3">
                  <CustomButton type="custom" class="bg-green-400 text-white"
                    @click="submit()">
                    <ArrowUpOnSquareIcon class="h-5 w-5 shrink-0" />
                    <span>Submit</span>
                  </CustomButton>
                  <CustomButton type="cancel" @click="sliderIsOpen = true" class="bg-gray-400 text-white" />
                </div>
              </template>
            </SlideOver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
