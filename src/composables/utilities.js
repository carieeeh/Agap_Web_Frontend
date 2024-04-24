import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export const useFormatDate = (date) => {
  const milliseconds =
    date.seconds * 1000 + Math.round(date.nanoseconds / 1000000);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const parsedDate = new Date(milliseconds);

  return parsedDate.toLocaleDateString("en-US", options);
};

export const useConvertGeoPoint = (geopoint) => {
  return { lat: geopoint.latitude, lng: geopoint.longitude };
};

export const useGetAllMonths = (from, to) => {
  let fromDate, toDate;

  if (!from || !to) {
    const currentYear = new Date().getFullYear();
    fromDate = new Date(currentYear, 0, 1);
    toDate = new Date();
  } else {
    fromDate = new Date(from);
    toDate = new Date(`${to} 23:59:59`);
  }

  const fromMonth = fromDate.getMonth();
  const toMonth = toDate.getMonth();

  let fromYear = fromDate.getFullYear();
  const toYear = toDate.getFullYear();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fromIndex = fromMonth;
  const toIndex = toMonth;

  const previousMonthsArray = [];
  let year = currentYear;
  console.log(fromYear, toYear);
  console.log(fromYear <= toYear);
  console.log(`${months[toMonth]} ${toYear}`);
  for (let i = fromIndex; i != toIndex + 1; i++) {
    year = fromYear > toYear ? fromYear : toYear;
    if (i == 12) {
      i = 0;
      fromYear++;
    }
    previousMonthsArray.push(`${months[i]} ${year}`);
  }

  console.log(previousMonthsArray);
  return previousMonthsArray;
};

export const useFilterByDate = (from, to, list, dateProperty) => {
  const fromDate = new Date(from);
  const toDate = new Date(`${to} 23:59:59`);

  return list.filter((item) => {
    const itemDate = new Date(item[dateProperty]);
    return itemDate >= fromDate && itemDate <= toDate;
  });
};

export function useRandomPassword() {
  const length = 6;
  let password = "";
  const numbers = "0123456789";
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  password += numbers.charAt(Math.floor(Math.random() * numbers.length));

  for (let i = 1; i < length; i++) {
    const char = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    password += char;
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export const useErrorMessage = function (title, description, position) {
  createToast(
    { title: title, description: description },
    {
      toastBackgroundColor: "#AF1E1E",
      type: "danger",
      showIcon: true,
      hideProgressBar: true,
      position: position,
      showCloseButton: false,
      transition: "bounce",
      timeout: 3000,
    }
  );
};

export const useSuccessMessage = function (title, description, position) {
  createToast(
    { title: title, description: description },
    {
      toastBackgroundColor: "#0FA958",
      showIcon: true,
      showCloseButton: false,
      hideProgressBar: true,
      position: position,
      type: "success",
      transition: "bounce",
      timeout: 3000,
    }
  );
};

export const useWarningMessage = function (title, description, position) {
  createToast(
    { title: title, description: description },
    {
      // toastBackgroundColor: '#ffc43d',
      showIcon: true,
      showCloseButton: false,
      hideProgressBar: true,
      position: position,
      type: "warning",
      transition: "bounce",
      timeout: 3000,
    }
  );
};

export const useNotificationMessage = function (title, description, position) {
  createToast(
    { title: title, description: description },
    {
      toastBackgroundColor: "#2465C7",
      showIcon: true,
      showCloseButton: false,
      hideProgressBar: true,
      position: position,
      type: "success",
      transition: "bounce",
      timeout: 3000,
    }
  );
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const useDistanceCalculator = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export const useSortByDistance = (array, refLat, refLng) => {
  return array.sort((a, b) => {
    const distanceA = useDistanceCalculator(
      refLat,
      refLng,
      a.geopoint.latitude,
      a.geopoint.longitude
    );
    const distanceB = useDistanceCalculator(
      refLat,
      refLng,
      b.geopoint.latitude,
      b.geopoint.longitude
    );
    return distanceA - distanceB;
  });
};

export const useMapOptions = {
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};
