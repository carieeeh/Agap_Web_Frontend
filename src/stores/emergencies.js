import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { useFireStoreDb } from "@/firebase";

export const useEmergenciesCollection = defineStore("emergencies", {
  state: () => {
    return {
      emergencies: [],
      emergencies_feedback: [],
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
      const collectionRef = useCollection(
        collection(useFireStoreDb, "/agap_collection/staging/emergencies")
      );
      this.emergencies = collectionRef;
      // query(collectionRef, orderBy("create_at"), limit(10))
    },
    getEmergenciesFeedbacks() {
      this.emergencies_feedback = useCollection(
        collection(
          useFireStoreDb,
          "/agap_collection/staging/emergencies_feedback"
        )
      );
    },
  },
});
