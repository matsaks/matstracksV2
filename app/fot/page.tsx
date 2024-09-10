'use client'

import Map from '@/components/map'
import Stats from '@/components/stats'
import { Skeleton } from '@/components/ui/skeleton'
import { useActivitiesData } from '@/queries/activities'
import { ActivityType } from '@/types/activity'
import { toast } from 'sonner'

export default function Running() {
  const { data, isLoading, isError } = useActivitiesData('run')
  const activities: ActivityType[] = data || []

  if (isError) {
    toast.error('An error occurred while fetching activities.')
  }

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5 sm:col-span-4 h-[75vh]">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Map activities={activities} zoom={10} />
        )}
      </div>
      <div className="col-span-5 sm:col-span-1">
        <Stats type={'run'} activities={activities} loading={isLoading} />
      </div>
    </div>
  )
}
