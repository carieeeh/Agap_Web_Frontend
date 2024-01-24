<template>
  <div>
    <div class="w-1/2">
      <Listbox as="div" v-model="selected">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
          >Assigned to</ListboxLabel
        >
        <div class="relative mt-2">
          <ListboxButton
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryRed sm:text-sm sm:leading-6"
          >
            <span class="block truncate">{{ selected.name }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="person in people"
                :key="person.id"
                :value="person"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'bg-primaryRed text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ person.name }}</span
                  >

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-primaryRed',
                      'absolute inset-y-0 left-0 flex items-center pl-1.5',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Last 30 days
    </h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-5">
      <div
        v-for="item in stats"
        :key="item.name"
        :class="[
          'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-b-4',
          item.color,
        ]"
      >
        <dt class="truncate text-sm font-medium text-gray-500">
          {{ item.name }}
        </dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {{ item.stat }}
        </dd>
      </div>
    </dl>
    <div class="flex justify-center items-center w-full px-5 mt-5">
      <Line
        :data="chartData"
        :options="chartOptions"
        aria-label="Accident Reports Chart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = reactive({
  labels: ["January", "February", "March"],
  datasets: [
    { data: [10, 15, 12], label: "Fire", borderColor: "#FF1F1E", fill: true },
    {
      data: [15, 20, 40],
      label: "Earthquake",
      borderColor: "#FFC700",
      fill: true,
    },
    { data: [5, 30, 10], label: "Medical", borderColor: "#22C55E", fill: true },
    { data: [50, 1, 15], label: "Flood", borderColor: "#2A67EB", fill: true },
    { data: [0, 5, 30], label: "Police", borderColor: "#38BDF8", fill: true },
  ],
});

const chartOptions = { responsive: true };

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

const selected = ref(people[3]);
const stats = [
  { name: "Fire Reports", stat: "5", color: "border-b-primaryRed" },
  { name: "Earthquake Reports", stat: "0", color: "border-b-primaryYellow" },
  { name: "Medical Reports", stat: "3", color: "border-b-green-500" },
  { name: "Flood Reports", stat: "1", color: "border-b-blue-600" },
  { name: "Police Reports", stat: "10", color: "border-b-sky-400" },
];
</script>
