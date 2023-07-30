import { useQuery } from "@tanstack/react-query";
import { fetchAllZipcodes } from "../apis/zipcode";

const STALE_TIME = 100_000;
const QUERY_KEYS = {
    ZIPCODES_LIST: "zipcodesList"
};

const useFetchZipcodes = () =>
    useQuery([QUERY_KEYS.ZIPCODES_LIST], fetchAllZipcodes, {
        select: data =>
            data?.docs.map(doc => (doc.data().zipcode)),
        staleTime: STALE_TIME,
    });

export { useFetchZipcodes };