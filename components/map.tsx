"use client";
import { decodePolyline } from "@/functions/decodePolyline";
import { ActivityType } from "@/types/activity";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import { init } from "next/dist/compiled/webpack/webpack";

enum Colorcodes {
  "BackcountrySki" = "#0B89EC",
  "NordicSki" = "#0B89EC",
  "Ride" = "#277348",
  "Kayaking" = "#1BEBD8",
  "Kitesurf" = "#1BEBD8",
  "Run" = "#EC890B",
  "Hike" = "#EC890B",
  "Walk" = "#EC890B",
  "TrailRun" = "#EC890B",
}

interface IProps {
  activities: ActivityType[];
  center: LngLatLike;
  zoom?: number;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export default function ActivityMap({ activities, zoom, center }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<Map | null>(null);

  const intialZoom = zoom || 11;

  useEffect(() => {
    const _map = new Map({
      container: "map",
      style: "mapbox://styles/matsaks/clk09621d00ac01pf9lpj6mj6",
      center: center,
      zoom: intialZoom,
    });

    _map.on("load", () => {
      setMap(_map);
    });
  }, []);

  useEffect(() => {
    if (map) {
      map.flyTo({ center: center });
    }
  }, [center, map]);

  useEffect(() => {
    if (map) {
      activities.forEach((activity) => {
        if (activity.sportType === "Workout") return;
        map.addSource(activity.id.toString(), {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: decodePolyline(activity.summaryPolyline),
            },
          },
        });
        map.addLayer({
          id: activity.id.toString(),
          type: "line",
          source: activity.id.toString(),
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color":
              Colorcodes[activity.sportType as keyof typeof Colorcodes],
            "line-width": 5,
            "line-opacity": 0.7,
          },
        });
      });
    }
  }, [activities, map]);

  //if (loading) return <Skeleton className="w-[100%] h-[100%]" />;

  return <div id="map" ref={ref} className="w-[100%] h-[100%] rounded-xl" />;
}
