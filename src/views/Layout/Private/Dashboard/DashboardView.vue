<script setup>
import { reactive } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import ReportList from "@/views/components/List/ReportList.vue";
import DropdownList from "@/views/components/Dropdown/DropdownList.vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/20/solid";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = reactive({
  labels: ["January", "February", "March"],
  datasets: [
    {
      data: [10, 15, 12],
      label: "Fire",
      borderColor: "#FF1F1E",
      fill: true,
      backgroundColor: "#FF1F1E"
    },
    {
      data: [15, 20, 40],
      label: "Earthquake",
      borderColor: "#FFC700",
      fill: true,
      backgroundColor: "#FFC700"
    },
    {
      data: [5, 30, 10],
      label: "Medical",
      borderColor: "#22C55E",
      fill: true,
      backgroundColor: "#22C55E"
    },
    {
      data: [50, 1, 15],
      label: "Flood",
      borderColor: "#2A67EB",
      fill: true,
      backgroundColor: "#2A67EB"

    },
    {
      data: [0, 5, 30],
      label: "Police",
      borderColor: "#38BDF8",
      fill: true,
      backgroundColor: "#38BDF8"
    },
  ],
});

const chartOptions = { responsive: true };

const stats = [
  { name: "Fire Reports", stat: "5", color: "border-b-primaryRed", image: "/assets/images/gif/fire_building.gif" },
  { name: "Earthquake Reports", stat: "0", color: "border-b-primaryYellow", image: "/assets/images/gif/earthquake_colored.gif" },
  { name: "Medical Reports", stat: "3", color: "border-b-green-500", image: "/assets/images/gif/first-aid-kit.gif" },
  { name: "Flood Reports", stat: "1", color: "border-b-blue-600", image: "/assets/images/gif/flood.gif" },
  { name: "Police Reports", stat: "10", color: "border-b-sky-400", image: "/assets/images/gif/security-guard.gif" },
];


const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

</script>

<template>
  <div>
    <div class="grid grid-cols-12 items-end gap-4">
      <DropdownList :list="months" label="From month:" property="name" class="col-span-4" />
      <DropdownList :list="months" label="To month:" property="name" :default="months.length - 1" class="col-span-4" />
      <button class="col-span-2 bg-green-300 rounded-md h-9 flex items-center justify-center gap-3 hover:bg-green-400">
        <ArrowDownTrayIcon class="w-5 h-5 shrink-0"/>
        Download .csv file
      </button>
    </div>

    <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">
      Last 30 days
    </h3> -->
    <ReportList :stats="stats" />
    <div class="flex justify-center items-center w-full px-5 mt-5">
      <Line :data="chartData" :options="chartOptions" aria-label="Accident Reports Chart" />
    </div>
  </div>
</template>