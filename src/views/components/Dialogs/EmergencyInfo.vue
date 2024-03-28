<script setup>
import { useFormatDate } from '@/composables/utilities.js'
import { XCircleIcon } from '@heroicons/vue/24/outline';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import CustomButton from '@/views/components/Buttons/CustomButton.vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

defineProps({ isOpen: Boolean, emergency: Object, hasMap: { type: Boolean, default: true } });
const emits = defineEmits(['close', 'accept'])

const accept = (emergency) => {
    console.log(emergency);
    emits('accept', emergency);
}

const details = [
    { label: "Status", key: "status" },
    { label: "Date", key: "created_at" },
    { label: "Type", key: "type" },
    { label: "Rescuers", key: "rescuer_uids" },
    { label: "Total Units", key: "total_units" },
    { label: "Description", key: "description" },
    { label: "Address", key: "address" },
];

</script>

<template>
    <TransitionRoot as="template" :show="isOpen">
        <Dialog as="div" class="relative z-10" @close="$emit('close')">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen ml-40 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <div>
                                <div class="text-center">
                                    <DialogTitle as="h3"
                                        class="text-2xl font-semibold leading-6 text-gray-900 capitalize mb-8">
                                        {{ emergency?.type }}
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <div class="grid grid-cols-2">
                                            <div v-for="detail in details" :key="detail.key">
                                                <div class="grid grid-cols-12 my-1.5 gap-1">
                                                    <p class="col-span-4 text-left">{{ detail.label }} :</p>
                                                    <p class="col-span-8 capitalize text-left"
                                                        v-if="detail.key == 'created_at'">
                                                        {{ useFormatDate(emergency[detail.key]) }}
                                                    </p>
                                                    <p v-else class="col-span-8 capitalize text-left">
                                                        {{ emergency[detail.key] }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="hasMap">
                                            <div class="text-left">Location :</div>
                                            <iframe class="my-3 rounded-lg" width="100%" height="250" frameborder="0"
                                                style="border: 0"
                                                :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyBgXlnez0RJ1GffBAeWjPDKNqI2Ad1DXAA&zoom=15&q=${emergency['geopoint'].latitude},${emergency['geopoint'].longitude}`"></iframe>
                                        </div>
                                        <div>
                                            <div class="mb-3 text-left">Evidences :</div>
                                            <div class="w-96 mx-auto">
                                                <carousel :items-to-show="1.5">
                                                    <slide v-for="image in emergency['file_urls']" :key="image">
                                                        <img class="rounded-lg" :src="image" />
                                                    </slide>

                                                    <template #addons>
                                                        <navigation />
                                                        <pagination />
                                                    </template>
                                                </carousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="emergency?.status == 'pending'" class="flex justify-end">
                                <div class="mt-5 w-52 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                    <CustomButton type="cancel" @click="$emit('close')"
                                        class="bg-gray-300 text-white" />
                                    <CustomButton type="accept" class="bg-green-400 text-white"
                                        @click="accept(emergency)" />
                                </div>
                            </div>
                            <div v-else class="flex justify-end">
                                <CustomButton type="accept" class="bg-red-500 text-white w-24" @click="$emit('close')" > 
                                   <XCircleIcon class="w-5 h-5 shrink-0"/> Close
                                </CustomButton>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>