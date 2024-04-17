import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { collection, doc, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { useFireStoreDb } from "@/firebase";
import { useSendPushNotification } from "@/composables/firebase_messaging";
import { useUsersCollection } from "./users";
import {
  useErrorMessage,
  useSortByDistance,
  useSuccessMessage,
} from "@/composables/utilities";

export const useEmergenciesCollection = defineStore("emergencies", {
  state: () => {
    return {
      emergencies: [],
      paginatedEmergencies: [],
      emergencies_feedback: [],
      totalEmergency: 0,
      rescuer_locations: [],
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
      return (monthIndex) =>
        state.emergencies.filter((item) => {
          const itemMonthIndex = new Date(item.created_at).getMonth() + 1;
          return itemMonthIndex === monthIndex;
        }).length;
    },
    totalEmergenciesByMonthType: (state) => {
      return (monthIndex, type) =>
        state.emergencies.filter((item) => {
          const itemMonthIndex = new Date(item.created_at).getMonth() + 1;
          return itemMonthIndex === monthIndex && item.type === type;
        }).length;
    },
  },
  actions: {
    getEmergencies() {
      const db = useFireStoreDb; // Replace if using a different variable for the Firestore instance

      const colRef = collection(db, "/agap_collection/staging/emergencies");
      const allQuery = query(colRef);
      const paginatedQuery = query(
        colRef,
        orderBy("created_at", "desc"),
        limit(10)
      ); // Order by create_at descending
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
    getRescuerLocations() {
      this.rescuer_locations = useCollection(
        collection(useFireStoreDb, "/agap_collection/staging/rescuer_locations")
      );
    },
    findNearestRescuer(emergency) {
      if (this.rescuer_locations.length > 0) {
        const rescuers = useSortByDistance(
          this.rescuer_locations,
          emergency.geopoint.latitude,
          emergency.geopoint.longitude
        );

        return rescuers;
      }
    },
    async acceptEmergency(emergency) {
      if (emergency) {
        try {
          const token = useUsersCollection().getUserFCMToken(
            emergency.resident_uid
          );
          const data = {
            title: "Emergency report approved.",
            message: "Wait for a rescuer to accept your emergency...",
            status: "approved",
            purpose: "approved",
          };
          const sortedRescuers = this.findNearestRescuer(emergency);
          console.log(sortedRescuers);
          await useSendPushNotification(token, data);
          const rescuerToken = useUsersCollection().getUserFCMToken(
            sortedRescuers[0].uid
          );

          emergency.docId = emergency.id;
          const rescuerData = {
            purpose: "rescuer",
            title: "EMERGENCY!.",
            message: "A resident needs your help.",
            emergency: JSON.stringify(emergency),
          };
          const docRef = doc(
            useFireStoreDb,
            "/agap_collection/staging/emergencies",
            emergency.docId
          );
          await updateDoc(docRef, { status: "approved" });

          await useSendPushNotification(rescuerToken, rescuerData);
          useSuccessMessage(
            "Success",
            "Looking for free rescuer to respond...",
            "top-right"
          );
        } catch (error) {
          useErrorMessage(
            "Oops",
            `Failed accepting emergency. code: ${error.code}`,
            "top-right"
          );
        }
      }
    },
  },
});
