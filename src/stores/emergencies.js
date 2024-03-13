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
  },
  actions: {
    getEmergencies() {
      this.emergencies = useCollection(
        collection(useFireStoreDb, "/agap_collection/staging/emergencies")
      );
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
