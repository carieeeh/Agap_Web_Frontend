<script setup>
import ReportList from "@/views/components/List/ReportList.vue";

</script>

<template>
  <div>
    <ReportList />

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
