import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useFireStoreDb } from "@/firebase";

export const useEmergenciesCollection = defineStore("emergencies", {
  state: () => {
    return {
      emergencies: [],
      paginatedEmergencies: [],
      emergencies_feedback: [],
      totalEmergency: 0,
    };
  },
  getters: {
    getEmergencyByResidentUid: (state) => {
      return (resident_uid) =>
        state.emergencies.find(
          (emergency) => (emergency.resident_uid = resident_uid)
        );
    },
    getEmergenciesByRescuerUid: (state) => {
      return (rescuer_uid) =>
        state.emergencies.find((emergency) => {
          return emergency.rescuer_uids.some(
            (rescuer) => rescuer == rescuer_uid
          );
        });
    },
    getEmergenciesByStatus: (state) => {
      return (status) =>
        state.emergencies.filter((emergency) => emergency.status == status);
    },
    getEmergenciesByType: (state) => {
      return (type) =>
        state.emergencies.filter((emergency) => emergency.type == type);
    },
    getEmergenciesByDate: (state) => {
      return (fromDate, toDate) => 
        state.emergencies.filter((item) => {
          const itemDate = new Date(item.created_at);
          const from = new Date(fromDate);
          const to = new Date(toDate);

          return itemDate >= from && itemDate <= to;
        });
    },
    totalEmergenciesByMonth: (state) => {
      return (monthIndex) => state.emergencies.filter(item => {
        const itemMonthIndex = new Date(item.created_at).getMonth() + 1;
        return itemMonthIndex === monthIndex;
      }).length;
    },
    totalEmergenciesByMonthType: (state) => {
      return (monthIndex, type) => state.emergencies.filter(item => {
        const itemMonthIndex = new Date(item.created_at).getMonth() + 1;
        return itemMonthIndex === monthIndex && item.type === type;
      }).length;
    }
  },
  actions: {
    getEmergencies() {
      const db = useFireStoreDb; // Replace if using a different variable for the Firestore instance

      const colRef = collection(db, "/agap_collection/staging/emergencies");
      const allQuery = query(colRef);
      const paginatedQuery = query(colRef, orderBy("created_at", "desc"), limit(10)); // Order by create_at descending
      const allEmergencies = useCollection(allQuery);

      this.totalEmergency = allEmergencies.length;

      const emergenciesRef = useCollection(paginatedQuery); // Use the query in useCollection
      this.emergencies = emergenciesRef;
    },
    getEmergenciesFeedbacks() {
      this.emergencies_feedback = useCollection(
        collection(
          useFireStoreDb,
          "/agap_collection/staging/emergencies_feedback"
        )
      );
    },
    onEmergencyCreated() {
      const colRef = collection(useFireStoreDb, "/agap_collection/staging/emergencies");
      onSnapshot(colRef, (snapshot) => {
        const addedDocs = snapshot.docChanges().filter((change) => change.type === "added");
      
        // Process the newly added documents
        addedDocs.forEach((doc) => {
          const newDocData = doc.doc.data();
          console.log("Added document:", newDocData);
          // Perform actions with the newly added data (e.g., update UI, store in state)
        });
      });
    }
  },
});
