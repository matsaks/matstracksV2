import { getNewestActivity } from "@/firestore/activites";
import { useNewestActivity } from "@/queries/activities";

export const syncActicities = async () => {
  const newestDateInDatabase = await getNewestActivity();
};
