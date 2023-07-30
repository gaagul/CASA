import { getFromLocalStorage } from "./useLocalStorage";
import { useFetchUserById } from "./useUsersApi";

export const useUser = () => {
  const { uid } = JSON.parse(getFromLocalStorage("loggedInUser"));
  const { data, isLoading, refetch } = useFetchUserById(uid);
  const userDetails = data?.data();

  return { userDetails, isLoading, refetchUser: refetch };
};
