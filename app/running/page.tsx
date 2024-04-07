"use client";
import Locationbar from "@/components/locationbar";
import Map from "@/components/map";
import Stats from "@/components/stats";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";

export default function Running() {
  // const { data, isLoading } = useActivitiesData("run");

  // const activities: ActivityType[] = data || [];
  const activities: ActivityType[] = [];

  return (
    <div>
      <div className="hidden sm:block">
        <div className="h-[75vh] flex flex-row">
          <div className="basis-4/5">
            <Map activities={activities} loading={true} />
          </div>
          <div className="basis-1/5">
            <Stats
              type="run"
              activities={activities}
              loading={true}
              direction="vertical"
            />
          </div>
        </div>
        <Locationbar loading={true} />
      </div>
      <div className="sm:hidden">
        <div className="h-[75vh]">
          <Map activities={activities} loading={true} />
        </div>
        <div className="mt-2">
          <Locationbar loading={true} smallScreen />
        </div>
        <div className="mt-4">
          <Stats
            type="run"
            activities={activities}
            loading={true}
            direction="horizontal"
          />
        </div>
      </div>
    </div>
  );
}
