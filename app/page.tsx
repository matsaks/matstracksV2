"use client";
import Locationbar from "@/components/locationbar";
import Map from "@/components/map";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";

export default function Home() {
  // const { data, isLoading, isError } = useActivitiesData("");

  // const activities: ActivityType[] = data || [];

  // if (isError) {
  // TODO smell ut en toast
  //   return <p>Error...</p>;
  // }

  return (
    <div>
      <div className="h-[75vh]">
        {/* <Map activities={activities} loading={isLoading || isError || activities.length === 0}/>
        <Locationbar loading={isLoading || isError || activities.length === 0} */}
        <Locationbar loading={false} />
      </div>
    </div>
  );
}
