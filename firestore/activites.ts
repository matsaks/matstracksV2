import { db } from "@/services/firebase";
import { ActivityType, IActivity } from "@/types/activity";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const activitiesCollection = collection(db, "activities");

export const getAcitivites = async (
  type: string
): Promise<ActivityType[] | null> => {
  let q = query(activitiesCollection);
  if (type === "run") {
    q = query(
      activitiesCollection,
      or(
        where("sportType", "==", "Run"),
        where("sportType", "==", "TrailRun"),
        where("sportType", "==", "Hike")
      )
    );
  }
  if (type === "ski") {
    q = query(
      activitiesCollection,
      or(
        where("sportType", "==", "BackcountrySki"),
        where("sportType", "==", "NordicSki")
      )
    );
  }

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  const activities: ActivityType[] = [];

  snapshot.docs.map((doc) => {
    const newActivity: ActivityType = {
      id: doc.data().id,
      name: doc.data().name,
      distance: doc.data().distance,
      movingTime: doc.data().movingTime,
      elevHigh: doc.data().elevHigh,
      elevLow: doc.data().elevLow,
      endLatlng: doc.data().endLatlng,
      summaryPolyline: doc.data().summaryPolyline,
      sportType: doc.data().sportType,
      startDate: doc.data().startDate,
      startLatlng: doc.data().startLatlng,
      totalElevGained: doc.data().totalElevGained,
    };
    activities.push(newActivity);
  });
  return activities;
};

export const getNewestActivity = async () => {
  const q = query(activitiesCollection, orderBy("startDate", "desc"), limit(1));
  const snapshot = await getDocs(q);
  const startDateString = snapshot.docs[0].data().startDate;
  const startDate = new Date(startDateString);
  return startDate.getTime();
};

export const addActivities = async (activities: IActivity[]) => {
  activities.map((activity: IActivity) => {
    addDoc(collection(db, `activities`), { ...activity });
  });
};
