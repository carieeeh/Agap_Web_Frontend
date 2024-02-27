<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import { ref } from "vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, } from "@headlessui/vue";
import { watch } from "vue";

const props = defineProps({
    list: { type: Array, default: [""] },
    label: { type: String, default: "Label" },
    default: { type: Number, default: 0 },
    property: String,
});

const selected = ref(props.list[props.default]);

watch(selected, (newVal, oldVal) => {
    console.log(newVal, oldVal);
})
</script>

<template>
    <div>
        <Listbox as="div" v-model="selected">
            <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</ListboxLabel>
            <div class="relative mt-2">
                <ListboxButton
                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryRed sm:text-sm sm:leading-6">
                    <span class="block truncate"> {{ property ? selected[property] : selected }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption as="template" v-for="(item, index) in list" :key="index" :value="item"
                            v-slot="{ active, selected }">
                            <li :class="[
                                active ? 'bg-primaryRed text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-8 pr-4',
                            ]">
                                <span :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate',
                                ]">{{  property ? item[property] : item }}</span>

                                <span v-if="selected" :class="[
                                    active ? 'text-white' : 'text-primaryRed',
                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                ]">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>