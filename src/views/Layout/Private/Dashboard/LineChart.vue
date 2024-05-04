<script setup>
import { inject, onMounted, reactive, ref, watch } from "vue";
import { Line } from "vue-chartjs";
import { useEmergenciesCollection } from '@/stores/emergencies';
import { useGetAllMonths } from '@/composables/utilities.js'
import ReportList from "@/views/components/List/ReportList.vue";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dateFilter = inject("dateFilter");
const emergencies = useEmergenciesCollection();
const chartData = reactive({
    labels: [],
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

const chartOptions = { responsive: true, };
const selectedEmergencies = ref([]);
const chartKey = ref(0);

const selectType = (event) => {
    selectedEmergencies.value = emergencies.getEmergenciesByType(event.key);
    selectedEmergencies.value.forEach(emergency => {
        emergency.showInfo = false;
    });
}

const selectAllType = () => {
    selectedEmergencies.value = emergencies.emergencies;
    selectedEmergencies.value.forEach(emergency => {
        emergency.showInfo = false;
    });
}

watch(dateFilter, () => {
    console.log(dateFilter);
    chartData.labels = useGetAllMonths(dateFilter.fromDate, dateFilter.toDate);
    chartKey.value++;
}, { deep: true });

onMounted(() => {
    chartData.labels = useGetAllMonths(dateFilter.fromDate, dateFilter.toDate);
    chartKey.value++;
});

</script>

<template>
    <div>
        <ReportList @select-type="selectType($event)" @select-all="selectAllType($event)" />
        <!-- {{ emergencies.totalEmergenciesByMonthType(3, 'police') }} -->
        <div class="flex justify-center items-center w-full px-5 mt-5" :key="chartKey">
            <Line :data="chartData" :options="chartOptions" aria-label="Accident Reports Chart" />
        </div>
    </div>
</template>