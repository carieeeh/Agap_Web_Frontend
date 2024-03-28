<script setup>
import { reactive, ref } from 'vue';
import { useEmergenciesCollection } from '@/stores/emergencies';
import { useConvertGeoPoint } from '@/composables/utilities.js'
import ReportList from "@/views/components/List/ReportList.vue";
import EmergencyInfo from "@/views/components/Dialogs/EmergencyInfo.vue";

const emergencies = useEmergenciesCollection();
const center = reactive({ lat: 14.5871, lng: 120.9845 });
const selectedEmergencies = ref([]);
const selectedEmergency = ref(null);
const showModal = ref(false);

const markerIcons = {
  fire: "/assets/images/static/google_pin_fire.png",
  medical: "/assets/images/static/google_pin_health1.png",
  earthquake: "/assets/images/static/google_pin_earthquake.png",
  flood: "/assets/images/static/google_pin_flood.png",
  police: "/assets/images/static/google_pin_police1.png",
}

const options = {
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
}

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

const showEmergencyInfo = (emergency, value) => {
  emergency.showInfo = value;
  selectedEmergency.value = emergency;
  console.log(emergency);
}


</script>

<template>
  <div>
    <ReportList @select-type="selectType($event)" @select-all="selectAllType($event)" />
    <div class="flex pt-5">
      <GMapMap ref="myMap" :options="options" :center="center" :zoom="15" map-type-id="roadmap"
        style="width: 76vw; height: 500px">
        <GMapMarker :key="index" v-for="(emergency, index) in selectedEmergencies"
          :position="useConvertGeoPoint(emergency.geopoint)" :icon="markerIcons[emergency.type]"
          @click="showEmergencyInfo(emergency, true)" :clickable="true">
          <GMapInfoWindow :opened="emergency.showInfo" :closeclick="true"
            @closeclick="showEmergencyInfo(emergency, false)">
            <div class="p-1">
              <p class="capitalize font-bold">{{ emergency.type }}</p>
              <p class="pb-2">{{ emergency.address }}</p>
              <button class="bg-primaryRed rounded-md text-white p-2" @click="showModal = true">
                More information
              </button>
            </div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </div>
    <EmergencyInfo :isOpen="showModal" @close="showModal = false" :emergency="selectedEmergency" :hasMap="false" />
  </div>
</template>
