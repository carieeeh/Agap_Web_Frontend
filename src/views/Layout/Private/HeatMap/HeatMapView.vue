<!-- eslint-disable no-undef -->
<script setup>
import { onMounted } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';

import ReportList from "@/views/components/List/ReportList.vue";

const stats = [
  { name: "Fire Reports", stat: "5", color: "border-b-primaryRed", image: "/assets/images/gif/fire_building.gif" },
  { name: "Earthquake Reports", stat: "0", color: "border-b-primaryYellow", image: "/assets/images/gif/earthquake_colored.gif" },
  { name: "Medical Reports", stat: "3", color: "border-b-green-500", image: "/assets/images/gif/first-aid-kit.gif" },
  { name: "Flood Reports", stat: "1", color: "border-b-blue-600", image: "/assets/images/gif/flood.gif" },
  { name: "Police Reports", stat: "10", color: "border-b-sky-400", image: "/assets/images/gif/security-guard.gif" },
];

const center = { lat: 14.5871, lng: 120.9845 }
const zoom = 15
const heatData = ref([])
const myMap = ref();

watch(myMap, googleMap => {
  if (googleMap) {
    googleMap.$mapPromise.then(map => {
      heatData.value = [
        { location: new google.maps.LatLng({ lat: 14.5871, lng: 120.9849 }) },
        { location: new google.maps.LatLng({ lat: 14.5871, lng: 120.9847 }) },
        { location: new google.maps.LatLng({ lat: 14.5871, lng: 120.9845 }) },
        { location: new google.maps.LatLng({ lat: 14.5871, lng: 120.9843 }) },
        { location: new google.maps.LatLng({ lat: 14.5871, lng: 120.9841 }) },
        
        { location: new google.maps.LatLng({ lat: 14.5855, lng: 120.9849 }) },
        { location: new google.maps.LatLng({ lat: 14.5849, lng: 120.9847 }) },
        { location: new google.maps.LatLng({ lat: 14.5843, lng: 120.9845 }) },
        { location: new google.maps.LatLng({ lat: 14.5865, lng: 120.9843 }) },
        { location: new google.maps.LatLng({ lat: 14.5852, lng: 120.9841 }) },
      ];
      console.log(map);
    })
  }
});

onMounted(() => {

})

</script>

<template>
  <div>
    <ReportList :stats="stats" />
    <div class="flex pt-5">
      <GMapMap ref="myMap" :center="center" :zoom="zoom" map-type-id="terrain" style="width: 76vw; height: 500px">
        <GMapHeatmap :data="heatData"></GMapHeatmap>
      </GMapMap>
    </div>
  </div>
</template>