<script setup>
import SlideOver from '@/views/components/SlideOver/SlideOver.vue';
import CustomTable from "@/views/components/Tables/CustomTable.vue";
import { ref } from 'vue';

const isSliderOpen = ref(false);

const tableHeader = [
    { label: "Station Name", key: "station_name" },
    { label: "Address", key: "station_address" },
    { label: "Total Rescuers", key: "total_rescuers" },
    { label: "Total Units", key: "total_units" },
    { label: "Categories", key: "types" },
    { label: "Status", key: "status" },
];

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

function selectStation(event) {
    console.log(event);
    isSliderOpen.value = true;
}
</script>

<template>
    <div>
        <CustomTable label="Incident Reports" :tableHeader="tableHeader" :items="tableItems"
            @row-click="selectStation($event)" class="z-50">

        </CustomTable>
        <SlideOver :isOpen="isSliderOpen" @close="isSliderOpen = false" title="Station Name">
            
        </SlideOver>
    </div>
</template>
