<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { QueueListIcon } from '@heroicons/vue/24/outline';
import { useEmergenciesCollection } from '@/stores/emergencies';
import CustomButton from '@/views/components/Buttons/CustomButton.vue';
import Dropdown from '@/views/components/Dropdown/DropdownLabeless.vue';

defineProps({ hasAll: { type: Boolean, default: true }, hasFilter: { type: Boolean, default: false } });
const emits = defineEmits(['select-type', 'select-all', 'select-status']);
const statusList = ["--select--", "ongoing", "accepted", "rejected", "finished", "approved"];
const emergencies = useEmergenciesCollection();
const selected = ref(null);

const selectAll = () => {
    emits('select-all');
    selected.value = null;
}

const select = (item) => {
    selected.value = item.name;
    emits('select-type', item);
}

const selectStatus = (item) => {
    emits('select-status', item);
}

const stats = reactive([
    { name: "Fire Reports", key: 'fire', stat: 5, color: "border-b-primaryRed", image: "/assets/images/gif/fire_building.gif" },
    { name: "Earthquake Reports", key: 'earthquake', stat: 0, color: "border-b-primaryYellow", image: "/assets/images/gif/earthquake_colored.gif" },
    { name: "Medical Reports", key: 'medical', stat: 3, color: "border-b-green-500", image: "/assets/images/gif/first-aid-kit.gif" },
    { name: "Flood Reports", key: 'flood', stat: 1, color: "border-b-sky-400", image: "/assets/images/gif/flood.gif" },
    { name: "Police Reports", key: 'police', stat: 10, color: "border-b-blue-600", image: "/assets/images/gif/security-guard.gif" },
]);

watch(() => emergencies.emergencies, () => {
    stats.forEach(report => {
        report.stat = emergencies.emergencies.filter(emergency => emergency.type == report.key).length;
    })
})

onMounted(() => {
    stats.forEach(report => {
        report.stat = emergencies.emergencies.filter(emergency => emergency.type == report.key).length;
    })
    selectAll();
})

</script>

<template>
    <div class="mt-5">
        <div class="flex items-center gap-2">
            <CustomButton class="bg-green-400 text-white" @click="selectAll()">
                <QueueListIcon class="h-5 w-5 shrink-0" /> Show all reports
            </CustomButton>
            <div v-if="hasFilter" class="pl-2 flex items-center gap-2">
                <p>Filter by status:</p>
                <Dropdown class="capitalize w-36" :list="statusList" @select="selectStatus($event)" />
            </div>
        </div>


        <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-5">
            <div v-for="item in stats" :key="item.name" @click="select(item)" :class="[
                'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-b-4 hover:cursor-pointer relative',
                item.color,
            ]">
                <div v-show="selected == item.name" class="h-2 w-2 bg-red-500 rounded-full absolute right-1 top-1">
                </div>
                <div class="truncate text-sm font-medium text-gray-500">
                    {{ item.name }}
                </div>
                <div class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 relative">
                    {{ item.stat }}
                    <img class="h-14 absolute -top-6 -right-4" :src="item.image" alt="" />
                </div>
            </div>
        </dl>
    </div>
</template>