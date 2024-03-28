<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useEmergenciesCollection } from '@/stores/emergencies';

const props = defineProps({ hasAll: { type: Boolean, default: true } });
const emits = defineEmits(['click', 'all']);

const emergencies = useEmergenciesCollection();
const selected = ref(null);

const selectAll = (event) => {
    emits('all', event);
    selected.value = null;
}

const select = (item) => {
    selected.value = item.name;
    emits('click', item);
}

const stats = reactive([
    { name: "Fire Reports", key: 'fire', stat: 5, color: "border-b-primaryRed", image: "/assets/images/gif/fire_building.gif" },
    { name: "Earthquake Reports", key: 'earthquake', stat: 0, color: "border-b-primaryYellow", image: "/assets/images/gif/earthquake_colored.gif" },
    { name: "Medical Reports", key: 'medical', stat: 3, color: "border-b-green-500", image: "/assets/images/gif/first-aid-kit.gif" },
    { name: "Flood Reports", key: 'flood', stat: 1, color: "border-b-blue-600", image: "/assets/images/gif/flood.gif" },
    { name: "Police Reports", key: 'police', stat: 10, color: "border-b-sky-400", image: "/assets/images/gif/security-guard.gif" },
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
})

</script>


<template>
    <div class="mt-5">

        <Vueform v-if="hasAll">
            <CheckboxElement name="checkbox" @change="selectAll($event)">
                Show all reports
            </CheckboxElement>
        </Vueform>
        <dl class="mt-1 grid grid-cols-1 gap-5 sm:grid-cols-5">
            <div v-for="item in stats" :key="item.name" @click="select(item)" :class="[
            'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-b-4 hover:cursor-pointer relative',
            item.color,
        ]">
                <div v-if="selected == item.name" class="h-2 w-2 bg-red-500 rounded-full absolute right-1 top-1 z-20">
                </div>
                <dt class="truncate text-sm font-medium text-gray-500">
                    {{ item.name }}
                </dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 relative">
                    {{ item.stat }}
                    <img class="h-14 absolute -top-6 -right-4" :src="item.image" alt="" />
                </dd>
            </div>
        </dl>
    </div>
</template>