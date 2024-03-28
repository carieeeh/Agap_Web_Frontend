
export const useFormatDate = (date) => {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString("en-US", options);
};

export const useConvertGeoPoint = (geopoint) => {
  return { lat: geopoint.latitude, lng: geopoint.longitude }
}