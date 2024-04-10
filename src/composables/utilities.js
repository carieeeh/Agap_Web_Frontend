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
  const fromDate = new Date(from);
  const toDate = new Date(`${to} 23:59:59`);

  const fromMonth = fromDate.getMonth();
  const toMonth = toDate.getMonth();

  const fromYear = fromDate.getFullYear();
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

  const fromIndex = months.indexOf(fromMonth);
  const toIndex = months.indexOf(toMonth);

  const previousMonthsArray = [];
  let year = currentYear;
  for (let i = fromIndex; i <= toIndex; i++) {
    if (fromYear != toYear) {
      year = i < 12 ? fromYear : toYear;
    }
    previousMonthsArray.push(`${months[i]} ${year}`);
  }

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
          toastBackgroundColor: '#AF1E1E',
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
      {title: title, description: description},
      {
          toastBackgroundColor: '#0FA958',
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
      {title: title, description: description},
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
      {title: title, description: description},
      {
          toastBackgroundColor: '#2465C7',
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