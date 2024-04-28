<script setup>
import { ref, reactive } from 'vue';
import InputForm from '@/views/components/Inputs/InputForm.vue';
import RadioInput from '@/views/components/Inputs/RadioInput.vue';
import SlideOver from '@/views/components/SlideOver/SlideOver.vue';
import CustomTable from "@/views/components/Tables/CustomTable.vue";
import CustomButton from '@/views/components/Buttons/CustomButton.vue';
import CheckboxInput from '@/views/components/Inputs/CheckboxInput.vue';

const isSliderOpen = ref(false);

const tableHeader = [
    { label: "Station Name", key: "station_name" },
    { label: "Address", key: "station_address" },
    { label: "Total Rescuers", key: "total_rescuers" },
    { label: "Total Units", key: "total_units" },
    { label: "Categories", key: "types" },
    { label: "Status", key: "status" },
];

const categories = ["medical", "fire", "police", "earthquake", "flood"];
const statusList = ["Active", "Inactive"];
const tableItems = [
    {
        station_name: "Barangay 123 Fire Station",
        station_address: "Barangay 123, Tondo, Manila City",
        total_rescuers: "50",
        total_units: "5",
        types: "Fire, Earthquake, Flood",
        status: "Active",
    },
    {
        station_name: "Barangay 123 Police Substation",
        station_address: "Barangay 123, Tondo, Manila City",
        total_rescuers: "20",
        total_units: "2",
        types: "Fire, Earthquake, Flood, Police, Medical",
        status: "Active",
    },
    {
        station_name: "Barangay 1 Medical Clinic",
        station_address: "Barangay 1, ABC, Random City",
        total_rescuers: "5",
        total_units: "1",
        types: "Fire, Earthquake, Medical",
        status: "Inactive",
    },
]

const form = reactive({
    name: "",
    address: "",
    total_rescuers: "",
    total_units: "",
    latitude: "",
    longitude: "",
    categories: [],
    contact: "",
    status: "Active"
});

function selectStation(event) {
    console.log(event);
    isSliderOpen.value = true;
}

function addStation() {
    isSliderOpen.value = true;
}

function addCategories(category) {
    if (!form.categories.includes(category)) {
        form.categories.push(category);
    } else {
        const index = form.categories.indexOf(category);
        if (index !== -1) {
            form.categories.splice(index, 1);
        }
    }
    console.log(form.categories);
}

function close() {
    isSliderOpen.value = false;
}

function submit() {
    console.log(form);
}
</script>

<template>
    <div>
        <CustomTable label="Manage Stations" :tableHeader="tableHeader" :items="tableItems"
            @row-click="selectStation($event)" class="z-50">
            <template #buttons>
                <div class="mx-8">
                    <button class="text-sm rounded-md bg-red-500 text-white px-2 py-1.5 hover:bg-red-600"
                        @click="addStation()">
                        Add Station
                    </button>
                </div>
            </template>
        </CustomTable>
        <SlideOver :isOpen="isSliderOpen" @close="isSliderOpen = false" title="Station Name">
            <template v-slot:content>
                <InputForm type="text" label="Station name" v-model="form.name" />
                <InputForm type="number" label="Total rescuers in station" v-model="form.total_rescuers" />
                <InputForm type="number" label="Total units in station" v-model="form.total_units" />
                <p>Location</p>
                <InputForm type="text" label="Station address" v-model="form.address" />
                <InputForm type="text" label="Station latitude" v-model="form.latitude" />
                <InputForm type="text" label="Station longitude" v-model="form.longitude" />
                <p class="text-sm">Station categories : </p>
                <div class="grid grid-cols-2 mt-1.5">
                    <CheckboxInput v-for="(category, index) in categories" :key="index" :label="category"
                        @checked="addCategories($event)" />
                </div>
                <InputForm type="text" label="Station contact (email or phone number)" v-model="form.contact" />
                <RadioInput label="Station status" :items="statusList" v-model="form.status" />
                <div class="flex w-full justify-end gap-4 mt-5">
                    <CustomButton type="cancel" @click="close()" class="bg-gray-300 text-white" />
                    <CustomButton type="submit" class="bg-green-400 text-white" @click="submit()" />
                </div>
            </template>
        </SlideOver>
    </div>
</template>