"use client";
import { decodePolyline } from "@/functions/decodePolyline";
import { useActivitiesData } from "@/queries/activities";
import { ActivityType } from "@/types/activity";
import ReactMapGL, { Layer, NavigationControl, Source } from "react-map-gl";
import { Skeleton } from "./ui/skeleton";

enum Colorcodes {
  "BackcountrySki" = "#0B89EC",
  "NordicSki" = "#0B89EC",
  "Ride" = "#277348",
  "Kayaking" = "#1BEBD8",
  "Kitesurf" = "#1BEBD8",
  "Run" = "#EC890B",
  "Hike" = "#EC890B",
  "TrailRun" = "#EC890B",
}

interface IProps {
  //type?: string;
  activities: ActivityType[];
  loading: boolean;
}

export default function Map(props: IProps) {
  const viewport = {
    latitude: 63.43049,
    longitude: 10.39506,
    zoom: 11,
  };

  if (props.loading)
    return <Skeleton className="w-[100%] h-[100%] rounded-xl" />;

  //const { data, isLoading, isError } = useActivitiesData(type || "");
  //const { data } = useActivitiesData(type || "");

  //if (isLoading) return <Skeleton className="w-[100%] h-[100%] rounded-xl" />;
  //return <Skeleton className="w-[100%] h-[100%] rounded-xl" />;

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error...</p>;

  //const activities: ActivityType[] = data || [];

  const CreateLine = (activity: ActivityType) => {
    const coordinates = decodePolyline(activity.summaryPolyline);
    const colorcode = Colorcodes[activity.sportType as keyof typeof Colorcodes];
    if (!colorcode) {
      return;
    }
    return (
      <Source
        id={activity.id.toString()}
        type="geojson"
        data={{
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        }}
      >
        <Layer
          id={activity.id.toString()}
          type="line"
          source={activity.id.toString()}
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{
            "line-color": colorcode,
            "line-width": 5,
            "line-opacity": 0.7,
          }}
        ></Layer>
      </Source>
    );
  };

  return (
    <ReactMapGL
      style={{ borderRadius: "10px" }}
      mapStyle={"mapbox://styles/matsaks/clk09621d00ac01pf9lpj6mj6"}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={viewport}
    >
      {props.activities.map((activity) => (
        <CreateLine
          key={activity.id}
          id={activity.id}
          name={activity.name}
          distance={activity.distance}
          movingTime={activity.movingTime}
          elevHigh={activity.elevHigh}
          elevLow={activity.elevLow}
          endLatlng={activity.endLatlng}
          summaryPolyline={activity.summaryPolyline}
          sportType={activity.sportType}
          startDate={activity.startDate}
          startLatlng={activity.startLatlng}
          totalElevGained={activity.totalElevGained}
        />
      ))}
    </ReactMapGL>
  );
}
