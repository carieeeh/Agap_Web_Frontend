<template>
  <div>
    <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div v-for="item in stats" :key="item.name" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">{{ item.name }}</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ item.stat }}</dd>
      </div>
    </dl>
    <div class="flex pt-5">
      <iframe width='1000' height='400' frameborder='0' style='border:0' src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAiGzgFITTlOuq5BTzbwA0Kpm3z_kOj7ms&zoom=16&q=14.5871,120.9845" allowfullscreen></iframe>
    </div>
  </div>
</template>
  
<script setup>
const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
]
</script>