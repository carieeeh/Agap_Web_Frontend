<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue';

const props = defineProps({
    list: { type: Array, default: () => [] },
    label: { type: String, default: "Label" },
    default: { type: [Number, String], default: 0 },
    property: String,
});

const emits = defineEmits(['select']);

const dropdownLabel = ref(props.label);

function select(item, index) {
    // dropdownLabel.value = props.property ? item[props.property] : item;
    emits('select', { item: props.property ? item[props.property] : item, index: index });
}

</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {{ dropdownLabel }}
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute left-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg">
                <div class="py-1">
                    <MenuItem v-slot="{ active }" v-for="(item, index) in list" :key="index"
                        @click="select(item, index)">
                    <div :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-2 pr-4 text-left']">
                        <span :class="[
                            active ? 'font-semibold' : 'font-normal',
                            'block truncate',
                        ]">
                            {{ `${Math.abs(item.distance).toFixed(2)}km | ${item.name}` }}
                            <!-- {{ property ? item[property] : item }} -->
                        </span>

                        <span v-if="active" :class="[
                            active ? 'text-white' : 'text-blue-600',
                            'absolute inset-y-0 left-0 flex items-center pl-1.5',
                        ]">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                    </div>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>
