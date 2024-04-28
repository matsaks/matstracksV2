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
  const { data, isLoading, isError } = useActivitiesData("ski");
  const [location, setLocation] = useState<LngLatLike>([
    6.4683910566293585, 62.243102440282456,
  ]);

  const activities: ActivityType[] = data || [];

  const updateLocation = (location: LngLatLike) => {
    setLocation(location);
  };

  if (isError) {
    toast.error("An error occurred while fetching activities.");
  }

  return (
    <div>
      <div className="hidden sm:block">
        <div className="h-[75vh] flex flex-row">
          <div className="basis-4/5">
            {isLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Map activities={activities} center={location} zoom={10} />
            )}
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
        <Locationbar
          loading={isLoading}
          className="mt-2 w-[50%]"
          updateLocation={updateLocation}
          activityType="ski"
        />
      </div>
      <div className="sm:hidden">
        <div className="h-[75vh]">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <Map activities={activities} center={location} zoom={10} />
          )}
        </div>
        <Locationbar
          loading={isLoading}
          className="mt-2 w-[100%]"
          updateLocation={updateLocation}
          activityType="ski"
        />
        <div className="mt-4">
          <Stats
            type="ski"
            activities={activities}
            loading={isLoading}
            direction="horizontal"
          />
        </div>
      </div>
    </div>
  );
}
