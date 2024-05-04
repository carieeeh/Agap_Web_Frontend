<script setup>
import { ref } from 'vue';
import { useStationCollection } from '@/stores/station';
import InputForm from '@/views/components/Inputs/InputForm.vue';
import RadioInput from '@/views/components/Inputs/RadioInput.vue';
import SlideOver from '@/views/components/SlideOver/SlideOver.vue';
import CustomTable from "@/views/components/Tables/CustomTable.vue";
import CustomButton from '@/views/components/Buttons/CustomButton.vue';
import CheckboxInput from '@/views/components/Inputs/CheckboxInput.vue';

const isSliderOpen = ref(false);
const isEdit = ref(false);

const tableHeader = [
    { label: "Station Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Total Rescuers", key: "total_rescuers" },
    { label: "Total Units", key: "total_units" },
    { label: "Categories", key: "categories" },
    { label: "Status", key: "status" },
];
const station = useStationCollection();
const categories = ["medical", "fire", "police", "earthquake", "flood"];
const statusList = ["Active", "Inactive"];

function selectStation(event) {
    isEdit.value = true;
    station.form = {
        id: event.id,
        name: event.name,
        address: event.address,
        station_code: event.station_code,
        total_rescuers: event.total_rescuers,
        total_units: event.total_units,
        latitude: event.latitude,
        longitude: event.longitude,
        categories: event.categories,
        contact: event.contact,
        status: event.status,
    };
    isSliderOpen.value = true;
}

function addStation() {
    station.form = {
        id: "",
        name: "",
        address: "",
        station_code: "",
        total_rescuers: "",
        total_units: "",
        latitude: "",
        longitude: "",
        categories: [],
        contact: "",
        status: "Active",
    };
    isSliderOpen.value = true;
}

function addCategories(category) {
    if (!station.form.categories.includes(category)) {
        station.form.categories.push(category);
    } else {
        const index = station.form.categories.indexOf(category);
        if (index !== -1) {
            station.form.categories.splice(index, 1);
        }
    }
    console.log(station.form.categories);
}

function close() {
    isSliderOpen.value = false;
}

function submit() {
    if (isEdit.value) {
        station.updateStation()
        isEdit.value = false
    } else {
        station.createStation()
    }
    isSliderOpen.value = false;
}

</script>

<template>
    <div>
        <CustomTable label="Manage Stations" :tableHeader="tableHeader" :items="station.stations"
            @row-click="selectStation($event)" class="z-50">
            <template #buttons>
                <div class="mx-8">
                    <button class="text-sm rounded-md bg-red-500 text-white px-2 py-1.5 hover:bg-red-600"
                        @click="addStation()">
                        Add Station
                    </button>
                </div>
            </template>
            <template v-slot:categories="slotProps">
                {{ slotProps.data.categories.join(", ") }}
            </template>
        </CustomTable>
        <SlideOver :isOpen="isSliderOpen" @close="isSliderOpen = false" title="Station Name">
            <template v-slot:content>
                <InputForm type="text" label="Station name" v-model="station.form.name" />
                <InputForm type="text" label="Station code" v-model="station.form.station_code" />
                <InputForm type="number" label="Total rescuers in station" v-model="station.form.total_rescuers" />
                <InputForm type="number" label="Total units in station" v-model="station.form.total_units" />
                <p>Location</p>
                <InputForm type="text" label="Station address" v-model="station.form.address" />
                <InputForm type="text" label="Station latitude" v-model="station.form.latitude" />
                <InputForm type="text" label="Station longitude" v-model="station.form.longitude" />
                <p class="text-sm">Station categories : </p>
                <div class="grid grid-cols-2 mt-1.5">
                    <CheckboxInput v-for="(category, index) in categories" :key="index" :label="category"
                        :checked="station.form.categories.includes(category)" @checked="addCategories($event)" />
                </div>
                <InputForm type="text" label="Station contact (email or phone number)" v-model="station.form.contact" />
                <RadioInput label="Station status" :items="statusList" v-model="station.form.status" />
                <div class="flex w-full justify-end gap-4 mt-5">
                    <CustomButton type="cancel" @click="close()" class="bg-gray-300 text-white" />
                    <CustomButton type="submit" class="bg-green-400 text-white" :isLoading="station.isLoading"
                        @click="submit()" />
                </div>
            </template>
        </SlideOver>
    </div>
</template>
