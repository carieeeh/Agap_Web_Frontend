<!-- eslint-disable no-undef -->
<script setup>
import { onMounted } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import ReportList from "@/views/components/List/ReportList.vue";

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
    <ReportList />
    <div class="flex pt-5">
      <GMapMap ref="myMap" :center="center" :zoom="zoom" map-type-id="terrain" style="width: 76vw; height: 500px">
        <GMapHeatmap :data="heatData"></GMapHeatmap>
      </GMapMap>
    </div>
  </div>
</template>