import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../apis/properties";
import { fetchAllUsers } from "../apis/users";

const STALE_TIME = 100_000;
const QUERY_KEYS = {
  USER_BY_ID: "userById",
  USERS_LIST: "usersList",
};

const useFetchUsers = () =>
  useQuery([QUERY_KEYS.USERS_LIST], fetchAllUsers, {
    select: data =>
      data?.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id })),
    staleTime: STALE_TIME,
  });

const useFetchUserById = id =>
  useQuery([QUERY_KEYS.USER_BY_ID, id], () => fetchUserById(id));

export { useFetchUserById, useFetchUsers };
