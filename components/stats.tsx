import {
  averageElevation,
  averageSpeedNordic,
  getAverageKm,
  getAverageKmTrail,
  getAveragePaceRuns,
  getDurationsThisYear,
  getNumberOfBC,
  getNumberOfNordic,
  getNumberOfRunsThisYear,
  getTotalKmNordic,
  getTotalKmThisYear,
  totalElevation,
} from "@/functions/statcalculations";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ActivityType } from "@/types/activity";
import { Skeleton } from "./ui/skeleton";

type Direction = "vertical" | "horizontal";

type IProps = {
  type: string;
  activities: ActivityType[];
  loading: boolean;
  direction: Direction;
};

export default function Stats(props: IProps) {
  const stats =
    props.type === "run"
      ? [
          {
            info: "Antall løpeturer i år",
            stat: getNumberOfRunsThisYear(props.activities),
          },
          {
            info: "Antall kilometer i år",
            stat: getTotalKmThisYear(props.activities).toFixed(2) + " km",
          },
          {
            info: "Antall timer løpt i år",
            stat: `${getDurationsThisYear(props.activities).hours}:${
              getDurationsThisYear(props.activities).minutes
            }`,
          },
          {
            info: "Antall kilometer i snitt per løpetur (flatt)",
            stat: getAverageKm(props.activities) + " km",
          },
          {
            info: "Snittfart per løpetur (flatt)",
            stat: getAveragePaceRuns(props.activities),
          },
          {
            info: "Snitt antall kilometer terreng",
            stat: getAverageKmTrail(props.activities) + " km",
          },
        ]
      : [
          {
            info: "Antall toppturer i år",
            stat: getNumberOfBC(props.activities),
          },
          {
            info: "Antall langrennsturer i år",
            stat: getNumberOfNordic(props.activities),
          },
          {
            info: "Antall høydemeter for sesongen (topptur)",
            stat: totalElevation(props.activities) + " m",
          },
          {
            info: "Snitt høydemeter (topptur)",
            stat: averageElevation(props.activities) + " m",
          },
          {
            info: "Antall kilometer langrenn",
            stat: getTotalKmNordic(props.activities).toFixed(1) + " km",
          },
          {
            info: "Gjennomsnittsfart langrenn",
            stat: averageSpeedNordic(props.activities) + " km/h",
          },
        ];

  const CardBlock = ({ direction = "horizontal" }) => {
    const isHorizontal = direction === "horizontal";
    const statsClassName = "w-[250px] h-[100px] rounded-xl  ml-1 mb-1";

    const cardBlocks = stats.map((item, index) => (
      <Card
        key={index}
        className={
          isHorizontal
            ? statsClassName
            : "w-full h-[100px] rounded-xl ml-1 mb-1"
        }
      >
        <CardDescription className="m-2">{item.info}</CardDescription>
        <CardTitle className="m-2">{item.stat}</CardTitle>
      </Card>
    ));

    return (
      <div className={isHorizontal ? "flex flex-row" : ""}>{cardBlocks}</div>
    );
  };

  const StatsContainer = ({ direction = "horizontal" }) => {
    return (
      <ScrollArea className={direction === "horizontal" ? "" : "h-[75vh]"}>
        <CardBlock direction={direction} />
        {direction === "horizontal" && <ScrollBar orientation="horizontal" />}
      </ScrollArea>
    );
  };

  const SkeletonBlock = ({ direction = "horizontal", count = 9 }) => {
    const isHorizontal = direction === "horizontal";
    const skeletonClassName = "w-[250px] h-[100px] rounded-xl  ml-1 mb-1";

    const skeletonBlocks = Array.from({ length: count }, (_, index) => (
      <Skeleton
        key={index}
        className={
          isHorizontal
            ? skeletonClassName
            : "w-100 h-[100px] rounded-xl ml-1 mb-1"
        }
      />
    ));

    return (
      <div className={isHorizontal ? "flex flex-row" : ""}>
        {skeletonBlocks}
      </div>
    );
  };

  const SkeletonContainer = ({ direction = "horizontal", count = 9 }) => {
    return (
      <ScrollArea className={direction === "horizontal" ? "" : "h-[75vh]"}>
        <SkeletonBlock direction={direction} count={count} />
        {direction === "horizontal" && <ScrollBar orientation="horizontal" />}
      </ScrollArea>
    );
  };

  return (
    <div>
      {props.loading ? (
        <SkeletonContainer direction={props.direction} />
      ) : (
        <StatsContainer direction={props.direction} />
      )}
    </div>
  );
}
