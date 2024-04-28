"use client";
import Locationbar from "@/components/locationbar";
import ActivityMap from "@/components/map";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";
import { LngLatLike } from "mapbox-gl";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { data, isLoading, isError } = useActivitiesData("");
  const [location, setLocation] = useState<LngLatLike>([6.327062, 62.463208]);

  const activities: ActivityType[] = data || [];
  //const activities: ActivityType[] = [];

  if (isError) {
    toast.error("An error occurred while fetching activities.");
  }
  //const isLoading = false;

  const updateLocation = (location: LngLatLike) => {
    setLocation(location);
  };

  return (
    <div>
      <div className="h-[75vh]">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <ActivityMap activities={activities} center={location} />
        )}

        <Locationbar
          loading={false}
          className="sm:hidden mt-2 w-[100%]"
          updateLocation={updateLocation}
          activityType="heatmap"
        />
        <Locationbar
          loading={false}
          className="hidden sm:block mt-2 w-[50%]"
          updateLocation={updateLocation}
          activityType="heatmap"
        />
      </div>
    </div>
  );
}
