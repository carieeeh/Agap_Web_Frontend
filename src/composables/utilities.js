export const useFormatDate = (date) => {
  const milliseconds = date.seconds * 1000 + Math.round(date.nanoseconds / 1000000);
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
