import { parse } from "qs";

export const getQueryParams = (options = {}) =>
  parse(location.search, { ignoreQueryPrefix: true, ...options });

export const createQueryString = obj => {
  const params = new URLSearchParams(Object.entries(obj));

  return params.toString();
};

export const initializeFilters = () => {
  const filters = ["type", "location", "price"];
  const params = getQueryParams();

  return filters.reduce((acc, filter) => {
    acc[filter] = params[filter] || "";

    return acc;
  }, {});
};

export const filterProperties = (properties, filters) => {
  const { type, location, price } = filters;

  return properties.filter(property => {
    const isTypeMatched = !type || property.type === type;
    const isLocationMatched =
      !location || property.zipcode === location;
    const isPriceMatched = !price || Number(property.price) === Number(price);

    return isTypeMatched && isLocationMatched && isPriceMatched;
  });
};
