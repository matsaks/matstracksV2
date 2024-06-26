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

  const updateLocation = (location: LngLatLike) => {
    setLocation(location);
  };

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5 sm:col-span-4 h-[75vh]">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Map activities={activities} center={location} zoom={10} />
        )}
      </div>
      <div className="col-span-5 my-2 sm:order-last">
        <Locationbar
          loading={isLoading}
          updateLocation={updateLocation}
          activityType={"running"}
        />
      </div>
      <div className="col-span-5 sm:col-span-1">
        <Stats type={"run"} activities={activities} loading={isLoading} />
      </div>
    </div>
  );
}
