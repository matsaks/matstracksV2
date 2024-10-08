'use client'

import ActivityMap from '@/components/map'
import { Skeleton } from '@/components/ui/skeleton'
import { useActivitiesData } from '@/queries/activities'
import { ActivityType } from '@/types/activity'
import { toast } from 'sonner'

export default function Home() {
  const { data, isLoading, isError } = useActivitiesData('')
  const activities: ActivityType[] = data || []

  if (isError) {
    toast.error('An error occurred while fetching activities.')
  }

  return (
    <div>
      <div className="h-[75vh]">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <ActivityMap activities={activities} />
        )}
      </div>
    </div>
  )
}
