"use client";
import Map from "@/components/map";
import Stats from "@/components/stats";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";

export default function Skiing() {
  const { data, isLoading } = useActivitiesData("run");
  const activities: ActivityType[] = data || [];

  return (
    <div className="h-[75vh] flex flex-row">
      <div className="basis-4/5">
        <Map activities={activities} loading={isLoading} />
      </div>
      <div className="basis-1/5">
        <Stats type={"ski"} activities={activities} loading={isLoading} />
      </div>
    </div>
  );
}
