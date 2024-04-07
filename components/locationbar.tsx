import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

interface IProps {
  loading: boolean;
  smallScreen?: boolean;
}

export default function Locationbar({ loading, smallScreen }: IProps) {
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

  const LocationButtons = () => {
    return (
      <div className="flex gap-6">
        <Button size={"sm"}>ÅLESUND</Button>
        <Button size={"sm"}>TRONDHEIM</Button>
        <Button size={"sm"}>LARVIK</Button>
        <Button size={"sm"}>NORDFJORD</Button>
        <Button size={"sm"}>PORSANGER</Button>
        <Button size={"sm"}>ÅLESUND</Button>
        <Button size={"sm"}>TRONDHEIM</Button>
        <Button size={"sm"}>LARVIK</Button>
        <Button size={"sm"}>NORDFJORD</Button>
        <Button size={"sm"}>PORSANGER</Button>
        <Button size={"sm"}>ÅLESUND</Button>
        <Button size={"sm"}>TRONDHEIM</Button>
        <Button size={"sm"}>LARVIK</Button>
        <Button size={"sm"}>NORDFJORD</Button>
        <Button size={"sm"}>PORSANGER</Button>
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
            <LocationButtons />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2 w-[50%]">
      {loading ? (
        // <SkeletonButtons />
        <ScrollArea>
          <SkeletonButtons />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        //TODO finne ut hvordan man får den sidelengs
        <ScrollArea>
          <LocationButtons />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}
