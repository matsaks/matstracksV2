import { getAccestoken } from "@/services/strava";
import { useQuery } from "@tanstack/react-query";

const useAccestoken = () => {
  return useQuery({
    queryKey: ["accesstoken"],
    queryFn: async () => getAccestoken(),
  });
};
