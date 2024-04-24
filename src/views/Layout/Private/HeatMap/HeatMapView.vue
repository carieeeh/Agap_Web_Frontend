<script setup>
import { ref } from 'vue';
import { useEmergenciesCollection } from '@/stores/emergencies';
import { useConvertGeoPoint, useMapOptions } from '@/composables/utilities.js'
import ReportList from "@/views/components/List/ReportList.vue";

const emergencies = useEmergenciesCollection();
const selectedEmergencies = ref([]);

const center = { lat: 14.5871, lng: 120.9845 }
const zoom = 15
const myMap = ref();

const selectType = (event) => {
  selectedEmergencies.value = [...emergencies.getEmergenciesByType(event.key)];
  selectedEmergencies.value.forEach(emergency => {
    emergency.showInfo = false;
  });
  selectedEmergencies.value.forEach(emergency => {
    // eslint-disable-next-line no-undef
    emergency.location = new google.maps.LatLng(
      useConvertGeoPoint(emergency.geopoint)
    )
  });
}

const selectAllType = () => {
  selectedEmergencies.value = emergencies.emergencies;
  selectedEmergencies.value.forEach(emergency => {
    emergency.showInfo = false;
  });
  selectedEmergencies.value.forEach(emergency => {
    // eslint-disable-next-line no-undef
    emergency.location = new google.maps.LatLng(
      useConvertGeoPoint(emergency.geopoint)
    )
  });
}
</script>

<template>
  <div>
    <ReportList @select-type="selectType($event)" @select-all="selectAllType($event)" />
    <div class="flex pt-5">
      <GMapMap ref="myMap" :options="useMapOptions" :center="center" :zoom="zoom" map-type-id="terrain"
        style="width: 76vw; height: 500px">
        <GMapHeatmap :data="selectedEmergencies"></GMapHeatmap>
      </GMapMap>
    </div>
  </div>
</template>