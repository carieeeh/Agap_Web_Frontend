<script setup>
import { useRoute } from "vue-router";
import DateInput from "@/views/components/Inputs/DateInput.vue";
import { useUsersCollection } from '@/stores/users';
import { computed, reactive, provide } from "vue";
import { useEmergenciesCollection } from "@/stores/emergencies";
// import { useSendPushNotification } from "@/composables/firebase_messaging";
const users = useUsersCollection();

const route = useRoute();
const dateFilter = reactive({ toDate: null, fromDate: null })
const linkPath = computed(() => route.path == '/app/dashboard/detailed-table' ? '/app/dashboard' : '/app/dashboard/detailed-table')
const linkLabel = computed(() => route.path == '/app/dashboard/detailed-table' ? 'Show line chart report >>' : 'Show detailed report on table >>')

function filter() {
  console.log(dateFilter);
  if (dateFilter.fromDate && dateFilter.toDate) {
    console.log(useEmergenciesCollection().getEmergenciesByDate(dateFilter.toDate, dateFilter.fromDate));
  }
}
const formattedEmergencies = computed(() => useEmergenciesCollection().emergencies.map(
  emergency => {
    return {
      "full_name": users.getUserFullName(emergency?.resident_uid),
      "created_at": Date(emergency?.created_at),
      "description": emergency?.description,
      "address": emergency?.address,
      "station": emergency?.rescuer_uids,
      "status": emergency?.status,
      "type": emergency?.type,
      "latitude": emergency?.geopoint.latitude,
      "longitude": emergency?.geopoint.longitude,
    }
  }
))
provide('dateFilter', dateFilter);
</script>

<template>
  <div>
    <div class="relative">
      <div class="absolute right-0 text-sm text-primaryRed hover:cursor-pointer">
        <RouterLink :to="linkPath + `?from=${dateFilter.fromDate}&to=${dateFilter.toDate}`">{{ linkLabel }}</RouterLink>
      </div>
      <div class="grid grid-cols-1 items-end gap-4 lg:grid-cols-12">
        <DateInput class="lg:col-span-4" label="From date:" v-model="dateFilter.fromDate" />
        <DateInput class="lg:col-span-4" label="To date:" v-model="dateFilter.toDate" />
        <button @click="filter"
          class="lg:col-span-2 md:truncate bg-red-300 rounded-md h-8 w-32 flex items-center justify-center gap-3 hover:bg-red-400 lg:w-full">
          Filter
        </button>
        <!-- https://www.npmjs.com/package/vue-json-excel3 -->
        <download-excel :data="formattedEmergencies"
          class="lg:col-span-2 md:truncate bg-green-300 rounded-md h-8 w-32 flex items-center justify-center gap-3 hover:cursor-pointer hover:bg-green-400 lg:w-full">
          <!-- <ArrowDownTrayIcon class="w-5 h-5 shrink-0" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="vscodeIconsFileTypeExcel0" x1="4.494" x2="13.832" y1="-2092.086" y2="-2075.914"
                gradientTransform="translate(0 2100)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#18884f" />
                <stop offset=".5" stop-color="#117e43" />
                <stop offset="1" stop-color="#0b6631" />
              </linearGradient>
            </defs>
            <path fill="#185c37"
              d="M19.581 15.35L8.512 13.4v14.409A1.192 1.192 0 0 0 9.705 29h19.1A1.192 1.192 0 0 0 30 27.809V22.5Z" />
            <path fill="#21a366"
              d="M19.581 3H9.705a1.192 1.192 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z" />
            <path fill="#107c41" d="M8.512 9.5h11.069V16H8.512Z" />
            <path d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2"
              opacity="0.1" />
            <path d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
              opacity="0.2" />
            <path d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
              opacity="0.2" />
            <path d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
              opacity="0.2" />
            <path fill="url(#vscodeIconsFileTypeExcel0)"
              d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.192 1.192 0 0 1 2 21.959V10.041A1.192 1.192 0 0 1 3.194 8.85" />
            <path fill="#fff"
              d="m5.7 19.873l2.511-3.884l-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017c.082-.188.169-.369.26-.546l1.342-2.447h1.7l-2.359 3.84l2.419 3.905h-1.809l-1.45-2.711A2.355 2.355 0 0 1 9.2 16.8h-.024a1.688 1.688 0 0 1-.168.351l-1.493 2.722Z" />
            <path fill="#33c481" d="M28.806 3h-9.225v6.5H30V4.191A1.192 1.192 0 0 0 28.806 3" />
            <path fill="#107c41" d="M19.581 16H30v6.5H19.581Z" />
          </svg>
          <span>Export</span>
        </download-excel>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>