import {
  averageElevation,
  averageSpeedNordic,
  getAverageKm,
  getAverageKmTrail,
  getAveragePaceRuns,
  getDurationsThisYear,
  getNumberOfBC,
  getNumberOfMix,
  getNumberOfNordic,
  getNumberOfResortDays,
  getNumberOfRunsThisYear,
  getNumberOfSkidays,
  getTotalKmNordic,
  getTotalKmThisYear,
  totalElevation,
} from '@/functions/statcalculations'
import { Card, CardDescription, CardTitle } from './ui/card'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { ActivityType } from '@/types/activity'
import { Skeleton } from './ui/skeleton'

type IProps = {
  type: string
  activities: ActivityType[]
  loading: boolean
}

export default function Stats({ type, activities, loading }: IProps) {
  const stats =
    type === 'run'
      ? [
          {
            info: 'Antall løpeturer i år',
            stat: getNumberOfRunsThisYear(activities),
          },
          {
            info: 'Antall kilometer i år',
            stat: getTotalKmThisYear(activities).toFixed(2) + ' km',
          },
          {
            info: 'Antall timer løpt i år',
            stat: `${getDurationsThisYear(activities).hours}:${
              getDurationsThisYear(activities).minutes
            }`,
          },
          {
            info: 'Antall kilometer i snitt per løpetur (flatt)',
            stat: getAverageKm(activities) + ' km',
          },
          {
            info: 'Snittfart per løpetur (flatt)',
            stat: getAveragePaceRuns(activities),
          },
          // {
          //   info: "Snitt antall kilometer terreng",
          //   stat: getAverageKmTrail(props.activities) + " km",
          // },
        ]
      : [
          {
            info: 'Antall skidager i år',
            stat: getNumberOfSkidays(activities),
          },
          {
            info: 'Antall toppturdager i år',
            stat: getNumberOfBC(activities),
          },
          {
            info: 'Antall dager i skianlegg',
            stat: getNumberOfResortDays(activities),
          },
          {
            info: 'Antall dager mix',
            stat: getNumberOfMix(activities),
          },
          {
            info: 'Antall langrennsturer i år',
            stat: getNumberOfNordic(activities),
          },
          {
            info: 'Antall høydemeter for sesongen (topptur)',
            stat: totalElevation(activities) + ' m',
          },
          {
            info: 'Snitt høydemeter (topptur)',
            stat: averageElevation(activities) + ' m',
          },
          {
            info: 'Antall kilometer langrenn',
            stat: getTotalKmNordic(activities).toFixed(1) + ' km',
          },
          {
            info: 'Gjennomsnittsfart langrenn',
            stat: averageSpeedNordic(activities) + ' km/h',
          },
        ]

  const CardBlock = () => {
    const cardBlocks = stats.map((item, index) => (
      <Card
        key={index}
        className="w-[250px] min-h-[100px] rounded-xl ml-1 mb-1 sm:w-full"
      >
        <CardDescription className="m-2">{item.info}</CardDescription>
        <CardTitle className="m-2">{item.stat}</CardTitle>
      </Card>
    ))

    return <div className="flex flex-row sm:flex-col">{cardBlocks}</div>
  }

  const StatsContainer = () => {
    return (
      <ScrollArea className="rounded-md sm:h-[75vh]">
        <CardBlock />
        <ScrollBar orientation="horizontal" className="sm:hidden" />
      </ScrollArea>
    )
  }

  const SkeletonBlock = ({ count = 9 }) => {
    const skeletonBlocks = Array.from({ length: count }, (_, index) => (
      <Skeleton
        key={index}
        className="w-[250px] h-[100px] rounded-xl  ml-1 mb-1"
      />
    ))

    return <div className="flex flex-row sm:flex-col">{skeletonBlocks}</div>
  }

  const SkeletonContainer = ({ count = 9 }) => {
    return (
      <ScrollArea className="rounded-md sm:h-[75vh]">
        <SkeletonBlock count={count} />
        <ScrollBar orientation="horizontal" className="sm:hidden" />
      </ScrollArea>
    )
  }

  return <div>{loading ? <SkeletonContainer /> : <StatsContainer />}</div>
}
