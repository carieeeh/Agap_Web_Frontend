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
    datasets: [],
});

const chartOptions = { responsive: true, };
const selectedEmergencies = ref([]);
const chartKey = ref(0);

const selectType = (event) => {
    console.log(event.key)
    generateChartDataSet(dateFilter.fromDate, dateFilter.toDate, event.key);
    chartKey.value++;

    selectedEmergencies.value = emergencies.getEmergenciesByType(event.key);
    selectedEmergencies.value.forEach(emergency => {
        emergency.showInfo = false;
    });
}

const selectAllType = () => {
    generateChartDataSet(dateFilter.fromDate, dateFilter.toDate);
    chartKey.value++;

    selectedEmergencies.value = emergencies.emergencies;
    selectedEmergencies.value.forEach(emergency => {
        emergency.showInfo = false;
    });
}

function generateChartDataSet(from, to, type) {
    let fromDate, toDate;

    if (!from || !to) {
        const currentYear = new Date().getFullYear();
        fromDate = new Date(currentYear, 0, 1);
        toDate = new Date();
    } else {
        fromDate = new Date(from);
        toDate = new Date(`${to} 23:59:59`);
    }

    const fromMonth = fromDate.getMonth() + 1;
    const toMonth = toDate.getMonth() + 1;

    const fireList = [];
    const earthList = [];
    const floodList = [];
    const medicalList = [];
    const policeList = [];

    for (let i = fromMonth; i <= toMonth; i++) {
        if (type == null) {
            fireList.push(emergencies.totalEmergenciesByMonthType(i, 'fire'));
            earthList.push(emergencies.totalEmergenciesByMonthType(i, 'earthquake'));
            floodList.push(emergencies.totalEmergenciesByMonthType(i, 'medical'));
            medicalList.push(emergencies.totalEmergenciesByMonthType(i, 'flood'));
            policeList.push(emergencies.totalEmergenciesByMonthType(i, 'police'));
        } else if (type == 'fire') {
            fireList.push(emergencies.totalEmergenciesByMonthType(i, 'fire'));
        } else if (type == 'earthquake') {
            earthList.push(emergencies.totalEmergenciesByMonthType(i, 'earthquake'));
        } else if (type == 'medical') {
            medicalList.push(emergencies.totalEmergenciesByMonthType(i, 'medical'));
        } else if (type == 'flood') {
            floodList.push(emergencies.totalEmergenciesByMonthType(i, 'flood'));
        } else if (type == 'police') {
            policeList.push(emergencies.totalEmergenciesByMonthType(i, 'police'));
        } 
    }

    chartData.datasets = [
        {
            data: fireList,
            label: "Fire",
            borderColor: "#FF1F1E",
            fill: true,
            backgroundColor: "#FF1F1E"
        },
        {
            data: earthList,
            label: "Earthquake",
            borderColor: "#FFC700",
            fill: true,
            backgroundColor: "#FFC700"
        },
        {
            data: floodList,
            label: "Medical",
            borderColor: "#22C55E",
            fill: true,
            backgroundColor: "#22C55E"
        },
        {
            data: medicalList,
            label: "Flood",
            borderColor: "#2A67EB",
            fill: true,
            backgroundColor: "#2A67EB"

        },
        {
            data: policeList,
            label: "Police",
            borderColor: "#38BDF8",
            fill: true,
            backgroundColor: "#38BDF8"
        },
    ]
}

watch(dateFilter, () => {
    chartData.labels = useGetAllMonths(dateFilter.fromDate, dateFilter.toDate);
    generateChartDataSet(dateFilter.fromDate, dateFilter.toDate);
    chartKey.value++;
}, { deep: true });

watch(() => emergencies.emergencies, () => {
    chartData.labels = useGetAllMonths(dateFilter.fromDate, dateFilter.toDate);
    generateChartDataSet(dateFilter.fromDate, dateFilter.toDate);
    chartKey.value++;
});

onMounted(() => {
    chartData.labels = useGetAllMonths(dateFilter.fromDate, dateFilter.toDate);
    generateChartDataSet(dateFilter.fromDate, dateFilter.toDate);
    chartKey.value++;
});

</script>

<template>
    <div>
        <ReportList @select-type="selectType($event)" @select-all="selectAllType($event)" />
        <div class="flex justify-center items-center w-full px-5 mt-5" :key="chartKey">
            <Line :data="chartData" :options="chartOptions" aria-label="Accident Reports Chart" />
        </div>
    </div>
</template>