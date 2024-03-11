<script setup>
import ReportList from "@/views/components/List/ReportList.vue";

const stats = [
  { name: "Fire Reports", stat: "5", color: "border-b-primaryRed", image: "/assets/images/gif/fire_building.gif" },
  { name: "Earthquake Reports", stat: "0", color: "border-b-primaryYellow", image: "/assets/images/gif/earthquake_colored.gif" },
  { name: "Medical Reports", stat: "3", color: "border-b-green-500", image: "/assets/images/gif/first-aid-kit.gif" },
  { name: "Flood Reports", stat: "1", color: "border-b-blue-600", image: "/assets/images/gif/flood.gif" },
  { name: "Police Reports", stat: "10", color: "border-b-sky-400", image: "/assets/images/gif/security-guard.gif" },
];
</script>

<template>
  <div>
    <ReportList :stats="stats" />

    <div class="flex pt-5">
      <iframe
        width="100%"
        height="400"
        frameborder="0"
        style="border: 0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBgXlnez0RJ1GffBAeWjPDKNqI2Ad1DXAA&zoom=16&q=14.5871,120.9845"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
