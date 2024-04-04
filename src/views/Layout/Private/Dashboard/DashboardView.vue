<script setup>
import { useRoute } from "vue-router";
import DateInput from "@/views/components/Inputs/DateInput.vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/20/solid";
import { computed,reactive } from "vue";

const route = useRoute();
const dateFilter = reactive({toDate: '', fromDate: ''})
const linkPath = computed(() => route.path == '/app/dashboard/detailed-table' ? '/app/dashboard' : '/app/dashboard/detailed-table')
const linkLabel = computed(() => route.path == '/app/dashboard/detailed-table' ? 'Show line chart report >>' : 'Show detailed report on table >>')
</script>

<template>
  <div>
    <div class="relative">
      <div class="absolute right-0 text-sm text-primaryRed hover:cursor-pointer">
        <RouterLink :to="linkPath + `?from=${dateFilter.fromDate}&to=${dateFilter.toDate}`">{{ linkLabel }}</RouterLink>
      </div>
      <div class="grid grid-cols-1 items-end gap-4 lg:grid-cols-12">
        <DateInput class="lg:col-span-5" label="From date:" v-model="dateFilter.fromDate"/>
        <DateInput class="lg:col-span-5" label="To date:" v-model="dateFilter.toDate" />
        <button class="lg:col-span-2 md:truncate bg-green-300 rounded-md h-8 flex items-center justify-center gap-3 hover:bg-green-400">
          <ArrowDownTrayIcon class="w-5 h-5 shrink-0" />
          Download .csv file
        </button>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>