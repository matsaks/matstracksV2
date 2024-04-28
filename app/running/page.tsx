"use client";
import Locationbar from "@/components/locationbar";
import Map from "@/components/map";
import Stats from "@/components/stats";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";
import { LngLatLike } from "mapbox-gl";
import { useState } from "react";
import { toast } from "sonner";

export default function Running() {
  const { data, isLoading, isError } = useActivitiesData("run");
  const [location, setLocation] = useState<LngLatLike>([6.327062, 62.463208]);

  const activities: ActivityType[] = data || [];

  if (isError) {
    toast.error("An error occurred while fetching activities.");
  }

  //const activities: ActivityType[] = [];

  const updateLocation = (location: LngLatLike) => {
    setLocation(location);
  };

  return (
    <div>
      <div className="hidden sm:block">
        <div className="h-[75vh] flex flex-row">
          <div className="basis-4/5">
            {isLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Map activities={activities} center={location} />
            )}
          </div>
          <div className="basis-1/5">
            <Stats
              type="run"
              activities={activities}
              loading={false}
              direction="vertical"
            />
          </div>
        </div>
        <Locationbar
          loading={false}
          className="mt-2 w-[50%]"
          updateLocation={updateLocation}
          activityType="running"
        />
      </div>
      <div className="sm:hidden">
        <div className="h-[75vh]">
          <Map activities={activities} center={location} />
        </div>
        <Locationbar
          loading={false}
          className="mt-2 w-[100%]"
          updateLocation={updateLocation}
          activityType="running"
        />
        <div className="mt-4">
          <Stats
            type="run"
            activities={activities}
            loading={false}
            direction="horizontal"
          />
        </div>
      </div>
    </div>
  );
}
