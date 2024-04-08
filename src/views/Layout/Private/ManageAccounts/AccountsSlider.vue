<script setup>
import { ref } from 'vue';
const sliderIsOpen = ref(false);

</script>

<template>
    <div>
        <SlideOver :isOpen="sliderIsOpen" @close="sliderIsOpen = false"
            :title="users.getUserFullName(emergencySelected?.resident_uid)">
            <template v-slot:content>
                <div v-for="detail in sliderDetails" :key="detail.key">
                    <div v-if="detail.key == 'geopoint'">
                        <div>{{ detail.label }} :</div>
                        <iframe class="my-3 rounded-lg" width="100%" height="300" frameborder="0" style="border: 0"
                            :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyDhHbTksP6L2sw2qAk2ozLzi-utU47uh5A&zoom=15&q=${emergencySelected[detail.key].latitude},${emergencySelected[detail.key].longitude}`"></iframe>
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
                    <CustomButton type="cancel" class="bg-gray-300 text-white" @click="sliderIsOpen = false" />
                    <!-- TODO: Accept incident send to nearest rescuer available -->
                    <CustomButton type="accept" class="bg-green-400 text-white" />
                </div>
            </template>
        </SlideOver>
    </div>
</template>

