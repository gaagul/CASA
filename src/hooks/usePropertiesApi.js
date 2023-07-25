import { useQuery } from "@tanstack/react-query";
import { fetchAllProperties, fetchPropertyById } from "../apis/properties";

const STALE_TIME = 100_000;
const QUERY_KEYS = {
  PROPERTIES_LIST: "propertiesList",
  PROPERTY_BY_ID: "propertyById",
};

const useFetchProperties = () =>
  useQuery([QUERY_KEYS.PROPERTIES_LIST], fetchAllProperties, {
    select: data =>
      data?.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id })),
    staleTime: STALE_TIME,
  });

const useFetchPropertyById = id =>
  useQuery([QUERY_KEYS.PROPERTY_BY_ID, id], () => fetchPropertyById(id));

export { useFetchProperties, useFetchPropertyById };
