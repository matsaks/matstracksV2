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
import { ScrollArea } from "./ui/scroll-area";
import { ActivityType } from "@/types/activity";
import { getAcitivites } from "@/firestore/activites";
import { GetServerSideProps } from "next";
import { Skeleton } from "./ui/skeleton";

type IProps = {
  type: string;
  activities: ActivityType[];
  loading: boolean;
};

export default function Stats(props: IProps) {
  const StatCard = () => {
    return (
      <div>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
        <Card>
          <CardDescription className="m-2">
            Antall toppturer i år
          </CardDescription>
          <CardTitle className="m-2">10000000</CardTitle>
        </Card>
      </div>
    );
  };

  const RenderStats = () => {
    if (props.type === "run") {
      const stats = [
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
          stat:
            getDurationsThisYear(props.activities).hours +
            ":" +
            getDurationsThisYear(props.activities).minutes,
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
      ];

      return (
        <div>
          {props.loading ? (
            <div>
              {stats.map((item, index) => (
                <Skeleton
                  key={index}
                  className="w-100 h-[100px] rounded-xl  ml-1 mb-1"
                />
              ))}
            </div>
          ) : (
            <div>
              {stats.map((item, index) => (
                <Card key={index} className="ml-1 mb-1">
                  <CardDescription className="m-2">{item.info}</CardDescription>
                  <CardTitle className="m-2">{item.stat}</CardTitle>
                </Card>
                //<StatBox key={index} info={item.info} stat={item.stat} />
              ))}
            </div>
          )}
        </div>
      );
    } else {
      const stats = [
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
          stat: averageElevation(props.activities) + "  m",
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
      console.log(stats);

      return (
        <div>
          {props.loading ? (
            <div>
              {stats.map((item, index) => (
                <Skeleton key={index} className="w-10 h-10 rounded-xl" />
              ))}
            </div>
          ) : (
            <div>
              {stats.map((item, index) => (
                <Card key={index}>
                  <CardDescription className="m-2">{item.info}</CardDescription>
                  <CardTitle className="m-2">{item.stat}</CardTitle>
                </Card>
                //<StatBox key={index} info={item.info} stat={item.stat} />
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <ScrollArea className="h-[75vh]">
      <RenderStats />
    </ScrollArea>
  );
}
