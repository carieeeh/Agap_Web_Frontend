import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { useFireStoreDb } from "@/firebase";
import { useErrorMessage, useSuccessMessage } from "@/composables/utilities";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

export const useStationCollection = defineStore("station", {
  state: () => {
    return {
      stations: [],
      isLoading: false,
      form: {
        id: "",
        name: "",
        address: "",
        station_code: "",
        total_rescuers: "",
        total_units: "",
        latitude: "",
        longitude: "",
        categories: [],
        contact: "",
        status: "Active",
      },
    };
  },
  getters: {
    getStationByCategory: (state) => (category) =>
      state.stations.filter((station) => station.category == category),
  },
  actions: {
    resetForm() {
      this.form = {
        id: "",
        name: "",
        address: "",
        station_code: "",
        total_rescuers: "",
        total_units: "",
        latitude: "",
        longitude: "",
        categories: [],
        contact: "",
        status: "Active",
      };
    },
    getStations() {
      this.stations = useCollection(
        collection(useFireStoreDb, "/agap_collection/staging/stations")
      );
    },
    async createStation() {
      this.isLoading = true;
      try {
        await addDoc(
          collection(useFireStoreDb, "/agap_collection/staging/stations"),
          this.form
        );
        useSuccessMessage("Success", "Station created.", "top-right");
        this.form = {
          id: "",
          name: "",
          address: "",
          total_rescuers: "",
          total_units: "",
          latitude: "",
          longitude: "",
          categories: [],
          contact: "",
          status: "Active",
        };
      } catch (error) {
        console.error(error);
        useErrorMessage("Oops", "Station creation failed.", "top-right");
      } finally {
        this.isLoading = false;
      }
    },
    async updateStation() {
      this.isLoading = true;

      try {
        const docRef = doc(
          useFireStoreDb,
          "/agap_collection/staging/stations",
          this.form.id
        );
        await setDoc(docRef, this.form);
        useSuccessMessage("Success", "User details updated.", "top-right");
        this.form = {
          id: "",
          name: "",
          address: "",
          station_code: "",
          total_rescuers: "",
          total_units: "",
          latitude: "",
          longitude: "",
          categories: [],
          contact: "",
          status: "Active",
        };
      } catch (error) {
        console.error(error);
        useErrorMessage("Oops", "User details update failed.", "top-right");
      } finally {
        this.isLoading = false;
      }
    },
  },
});
