"use client";
import Locationbar from "@/components/locationbar";
import Map from "@/components/map";
import Stats from "@/components/stats";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";

export default function Running() {
  const { data, isLoading } = useActivitiesData("ski");

  const activities: ActivityType[] = data || [];
  //const activities: ActivityType[] = [];

  return (
    <div>
      <div className="hidden sm:block">
        <div className="h-[75vh] flex flex-row">
          <div className="basis-4/5">
            <Map activities={activities} loading={isLoading} />
          </div>
          <div className="basis-1/5">
            <Stats
              type="ski"
              activities={activities}
              loading={isLoading}
              direction="vertical"
            />
          </div>
        </div>
        <Locationbar loading={isLoading} />
      </div>
      <div className="sm:hidden">
        <div className="h-[75vh]">
          <Map activities={activities} loading={isLoading} />
        </div>
        <div className="mt-2">
          <Locationbar loading={isLoading} smallScreen />
        </div>
        <div className="mt-4">
          <Stats
            type="run"
            activities={activities}
            loading={isLoading}
            direction="horizontal"
          />
        </div>
      </div>
    </div>
  );
}
