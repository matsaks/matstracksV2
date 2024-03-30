"use client";
import Map from "@/components/map";
import Stats from "@/components/stats";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";

export default function Running() {
  const { data, isLoading } = useActivitiesData("run");

  // if (isLoading)
  //   return (
  //     <div className="h-[75vh] flex flex-row">
  //       <div className="basis-4/5">
  //         <Skeleton className="w-[100%] h-[100%] rounded-xl" />;
  //       </div>
  //       <div className="basis-1/5">
  //         <Skeleton className="w-[100%] h-[100%] rounded-xl" />;
  //       </div>
  //     </div>
  //   );
  //return <Skeleton className="w-[100%] h-[100%] rounded-xl" />;

  //if (isLoading) return <p>Loading...</p>;
  //if (isError) return <p>Error...</p>;

  const activities: ActivityType[] = data || [];

  return (
    <div className="h-[75vh] flex flex-row">
      <div className="basis-4/5">
        <Map activities={activities} loading={isLoading} />
      </div>
      <div className="basis-1/5">
        <Stats type="run" activities={activities} loading={isLoading} />
      </div>
    </div>
  );
}
