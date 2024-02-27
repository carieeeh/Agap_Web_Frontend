<script setup>
import CustomTable from "@/views/components/Tables/CustomTable.vue";
const tableHeader = [""];
const items = [""];
</script>

<template>
    <div>
        <CustomTable label="Incident Reports" :tableHeader="tableHeader" :items="items" />
    </div>
</template>