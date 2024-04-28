import { LngLatLike } from "mapbox-gl";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

import { cn } from "@/lib/utils";

type ActivityType = "heatmap" | "running" | "ski";

interface IProps {
  loading: boolean;
  smallScreen?: boolean;
  className?: string;
  updateLocation: (location: LngLatLike) => void;
  activityType: ActivityType;
}

export default function Locationbar({
  loading,
  smallScreen,
  className,
  updateLocation,
  activityType,
}: IProps) {
  const SkeletonButtons = () => {
    return (
      <div className="flex gap-x-1">
        <Skeleton className="h-9 rounded-md px-3 w-[150px]" />
        <Skeleton className="h-9 rounded-md px-3 w-[150px]" />
        <Skeleton className="h-9 rounded-md px-3 w-[150px]" />
        <Skeleton className="h-9 rounded-md px-3 w-[150px]" />
      </div>
    );
  };

  const LocationButtonsHeatMap = () => {
    return (
      <div className="flex gap-6">
        <Button
          size={"sm"}
          onClick={() => updateLocation([6.327062, 62.463208])}
        >
          ÅLESUND
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([10.408688753978664, 63.425038501632145])
          }
        >
          TRONDHEIM
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([10.060883454630677, 59.03444602681835])
          }
        >
          LARVIK
        </Button>
        <Button
          size={"sm"}
          onClick={() => updateLocation([6.147719364574782, 61.80861153569357])}
        >
          NORDFJORD
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([24.999946385676303, 69.90256006446188])
          }
        >
          PORSANGER
        </Button>
      </div>
    );
  };

  const LocationButtonsRunning = () => {
    return (
      <div className="flex gap-6">
        <Button
          size={"sm"}
          onClick={() => updateLocation([6.327062, 62.463208])}
        >
          ÅLESUND
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([10.408688753978664, 63.425038501632145])
          }
        >
          TRONDHEIM
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([10.060883454630677, 59.03444602681835])
          }
        >
          LARVIK
        </Button>
        <Button
          size={"sm"}
          onClick={() => updateLocation([6.147719364574782, 61.80861153569357])}
        >
          NORDFJORD
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([24.999946385676303, 69.90256006446188])
          }
        >
          PORSANGER
        </Button>
      </div>
    );
  };

  const LocationButtonsSkiing = () => {
    return (
      <div className="flex gap-6">
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([6.4683910566293585, 62.243102440282456])
          }
        >
          Hjørundfjorden
        </Button>
        <Button
          size={"sm"}
          onClick={() => updateLocation([7.060459993324359, 62.40906090673966])}
        >
          Stordal
        </Button>
        <Button
          size={"sm"}
          onClick={() => updateLocation([8.836200522651154, 62.8209409150031])}
        >
          Nordmøre
        </Button>
        <Button
          size={"sm"}
          onClick={() => updateLocation([10.38012046460235, 63.36704022421766])}
        >
          Trondheim
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            updateLocation([6.080140498658573, 61.863087358904465])
          }
        >
          Nordfjord
        </Button>
      </div>
    );
  };

  if (smallScreen) {
    return (
      <div>
        {loading ? (
          <ScrollArea>
            <SkeletonButtons />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          //TODO finne ut hvordan man får den sidelengs
          <ScrollArea>
            {activityType === "heatmap" && <LocationButtonsHeatMap />}
            {activityType === "running" && <LocationButtonsRunning />}
            {activityType === "ski" && <LocationButtonsSkiing />}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      {loading ? (
        <ScrollArea className="rounded-md">
          <SkeletonButtons />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <ScrollArea className="rounded-md">
          {activityType === "heatmap" && <LocationButtonsHeatMap />}
          {activityType === "running" && <LocationButtonsRunning />}
          {activityType === "ski" && <LocationButtonsSkiing />}{" "}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}
