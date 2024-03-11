<script setup>
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { useFireStoreDb } from '@/firebase'
import CustomTable from "@/views/components/Tables/CustomTable.vue";
// import { onMounted, ref } from 'vue';

const emergencies = useCollection(collection(useFireStoreDb, '/agap_collection/staging/emergencies'))
// const agapCollection = useCollection(doc(collection(useFireStoreDb, 'agap_collection'), 'staging'))
const users = useCollection(collection(useFireStoreDb, '/agap_collection/staging/users'));

const tableHeader = [
    { label: "Reporter Name", key: "resident_uid" },
    { label: "Rescuer Name", key: "rescuer_uids" },
    { label: "Department", key: "type" },
    { label: "Total units", key: "total_units" },
    { label: "Category", key: "type" },
    { label: "Status", key: "status" },
    { label: "Date", key: "created_at" },
    { label: "Actions", key: "actions" },
];

// onMounted(() => {
//     emergencies.value.forEach(emergency => {
//         emergency['reporter_name'] = users.value.find(user => user.users_uid == emergency.resident_uid).first_name + " " + users.find(user => user.users_uid == emergency.resident_uid).last_name;
//     });
//     console.log(emergencies.value);
// });

</script>

<template>
    <div>
        <CustomTable label="Incident Reports" :tableHeader="tableHeader" :items="emergencies" :users="users" />
    </div>
</template>