<script setup>
import { ref } from 'vue';
import { useUsersCollection } from '@/stores/users';
import { useFormatDate } from '@/composables/utilities.js'
import { useEmergenciesCollection } from '@/stores/emergencies';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import SlideOver from '@/views/components/SlideOver/SlideOver.vue';
import CustomTable from "@/views/components/Tables/CustomTable.vue";
import CustomButton from '@/views/components/Buttons/CustomButton.vue';

const emergencies = useEmergenciesCollection();
const users = useUsersCollection();
const sliderIsOpen = ref(false);

const emergencySelected = ref(null);
const tableHeader = [
    { label: "Reporter Name", key: "resident_uid" },
    { label: "Rescuer Name", key: "rescuer_uids" },
    { label: "Department", key: "type" },
    { label: "Total units", key: "total_units" },
    { label: "Category", key: "type" },
    { label: "Status", key: "status" },
    { label: "Date", key: "created_at" },
];

const sliderDetails = [
    { label: "Status", key: "status" },
    { label: "Date", key: "created_at" },
    { label: "Type", key: "type" },
    { label: "Rescuers", key: "rescuer_uids" },
    { label: "Total Units", key: "total_units" },
    { label: "Description", key: "description" },
    { label: "Address", key: "address" },
    { label: "Location", key: "geopoint" },
    { label: "Evidences", key: "file_urls" },
];

const selectEmergency = (emergency) => {
    sliderIsOpen.value = true;
    emergencySelected.value = emergency;
}

</script>

<template>
    <div>
        <CustomTable label="Incident Reports" :tableHeader="tableHeader" :items="emergencies.emergencies"
            @row-click="selectEmergency($event)">
            <template v-slot:resident_uid="slotProps">
                {{ users.getUserFullName(slotProps.data.resident_uid) }}
            </template>
            <template v-slot:created_at="slotProps">
                {{ useFormatDate(slotProps.data.created_at) }}
            </template>
        </CustomTable>
        <SlideOver :isOpen="sliderIsOpen" @close="sliderIsOpen = false"
            :title="users.getUserFullName(emergencySelected?.resident_uid)">
            <template v-slot:content>
                <div v-for="detail in sliderDetails" :key="detail.key">
                    <div v-if="detail.key == 'geopoint'">
                        <div>{{ detail.label }} :</div>
                        <iframe class="my-3 rounded-lg" width="100%" height="300" frameborder="0" style="border: 0"
                            :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyBgXlnez0RJ1GffBAeWjPDKNqI2Ad1DXAA&zoom=15&q=${emergencySelected[detail.key].latitude},${emergencySelected[detail.key].longitude}`"></iframe>
                    </div>
                    <div v-else-if="detail.key == 'file_urls'">
                        <div class="mb-3">{{ detail.label }} :</div>
                        <carousel :items-to-show="1.5">
                            <slide v-for="image in emergencySelected[detail.key]" :key="image">
                                <img class="rounded-lg" :src="image" />
                            </slide>

                            <template #addons>
                                <navigation />
                                <pagination />
                            </template>
                        </carousel>
                    </div>
                    <div v-else class="grid grid-cols-12 my-3">
                        <p class="col-span-4">{{ detail.label }} :</p>
                        <p class="col-span-8 capitalize" v-if="detail.key == 'created_at'">
                            {{ useFormatDate(emergencySelected[detail.key]) }}
                        </p>
                        <p v-else class="col-span-8 capitalize">{{ emergencySelected[detail.key] }}</p>
                    </div>
                </div>
            </template>
            <template v-slot:customButtons>
                <div class="px-8 py-4 flex justify-end gap-4">
                    <CustomButton type="cancel" class="bg-gray-400 text-white" @click="sliderIsOpen = false"/>
                    <!-- TODO: Accept incident send to nearest rescuer available -->
                    <CustomButton type="accept" class="bg-green-400 text-white"/>
                </div>
            </template>
        </SlideOver>
    </div>
</template>