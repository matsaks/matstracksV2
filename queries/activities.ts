import {
  addActivities,
  addSingleActivityToDatabase,
  deleteActivityFromDatabase,
  getAcitivites,
  getNewestActivity,
} from '@/firestore/activites'
import { getAccestoken, getTenActivities } from '@/services/strava'
import { ActivityType, IActivity } from '@/types/activity'
import { useQuery } from '@tanstack/react-query'

export const useActivitiesData = (type: string) => {
  return useQuery<ActivityType[] | null>({
    queryKey: ['allActivities'],
    queryFn: async () => getAcitivites(type),
  })
}

export const useNewestActivity = () => {
  return useQuery<number>({
    queryKey: ['newestActivity'],
    queryFn: async () => getNewestActivity(),
  })
}

export const syncronizeActivities = async () => {
  const access_token = await getAccestoken()
  const newestDateInDatabase = await getNewestActivity()
  let page = 1
  const newActivities: ActivityType[] = []
  while (true) {
    const res = await getTenActivities(access_token, page)
    const temp: ActivityType[] = []
    res.map(
      (a: {
        start_date: string
        id: number
        name: string
        distance: number
        moving_time: number
        elev_high: number
        elev_low: number
        end_latlng: number[]
        map: { summary_polyline: string }
        type: any
        start_latlng: number[]
        total_elevation_gain: number
      }) => {
        const date = new Date(a.start_date)
        if (date.getTime() > newestDateInDatabase) {
          const newActivity: ActivityType = {
            id: a.id,
            name: a.name,
            distance: a.distance,
            movingTime: a.moving_time,
            elevHigh: a.elev_high,
            elevLow: a.elev_low,
            endLatlng: a.end_latlng,
            summaryPolyline: a.map.summary_polyline,
            sportType: a.type,
            startDate: a.start_date,
            startLatlng: a.start_latlng,
            totalElevGained: a.total_elevation_gain,
          }
          temp.push(newActivity)
        }
      }
    )

    newActivities.push(...temp)

    if (temp.length < 10) {
      break
    } else {
      page++
    }
  }
  await addActivities(newActivities)
  return newActivities
}

export const deleteActivity = async (id: number) => {
  await deleteActivityFromDatabase(id)
}

export const addSingleActivity = async (id: number) => {
  const access_token = await getAccestoken()
  await addSingleActivityToDatabase(access_token, id)
}
