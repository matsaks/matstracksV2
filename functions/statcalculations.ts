import { ActivityType } from '@/types/activity'

function isThisYear(date: string) {
  const d = new Date()
  const currentYear: number = d.getFullYear()
  const year1 = parseInt(date.slice(0, 4))
  return currentYear === year1
}

function isThisSeason(date: string) {
  const d = new Date()
  const currentYear: number = d.getFullYear()
  const currentMonth: number = d.getMonth()
  const year = parseInt(date.slice(0, 4))
  const month = parseInt(date.slice(5, 7))

  const seasonStartYear = currentMonth >= 9 ? currentYear : currentYear - 1
  const seasonEndYear = seasonStartYear + 1

  if (
    (year === seasonStartYear && month >= 9) ||
    (year === seasonEndYear && month < 9)
  ) {
    return true
  }
  return false
}

export function getTotalKmThisYear(activities: ActivityType[]) {
  let total = 0
  activities.map((a) => {
    if (isThisYear(a.startDate)) {
      total += a.distance
    }
  })
  return total / 1000
}

export function getNumberOfRunsThisYear(activities: ActivityType[]) {
  let total = 0
  activities.map((a) => {
    if (
      (a.sportType === 'Run' || a.sportType === 'TrailRun') &&
      isThisYear(a.startDate)
    ) {
      total++
    }
  })
  return total
}

export function getDurationsThisYear(activities: ActivityType[]) {
  let totalSec = 0
  activities.map((a) => {
    if (
      (a.sportType === 'Run' || a.sportType === 'TrailRun') &&
      isThisYear(a.startDate)
    ) {
      totalSec += a.movingTime
    }
  })
  const hours = Math.floor(totalSec / 3600)
  const remainingSeconds = totalSec % 3600
  const minutes = Math.floor(remainingSeconds / 60)
  return { hours, minutes, totalSec }
}

export function getAveragePaceRuns(activities: ActivityType[]) {
  const runs: ActivityType[] = []
  activities.map((a) => {
    if (a.sportType === 'Run') {
      runs.push(a)
    }
  })
  let totalSec = 0
  let totalDistance = 0
  runs.map((r) => {
    totalSec += r.movingTime
    totalDistance += r.distance
  })
  const min = totalSec / 60
  const pace = min / (totalDistance / 1000)
  const paceMin = Math.floor(pace)
  const paceSec = Math.round((pace - paceMin) * 60)

  return `${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} /km`
}

export function getAverageKm(activities: ActivityType[]) {
  const runs: ActivityType[] = []
  activities.map((a) => {
    if (a.sportType === 'Run') {
      runs.push(a)
    }
  })
  const numberOfRuns = getNumberOfRunsThisYear(runs)
  const totalKm = getTotalKmThisYear(runs)
  return (totalKm / numberOfRuns).toFixed(2)
}

export function getAverageKmTrail(activities: ActivityType[]) {
  const trailRuns: ActivityType[] = []
  activities.map((a) => {
    if (a.sportType === 'TrailRun') {
      trailRuns.push(a)
    }
  })
  const numberOfRuns = getNumberOfRunsThisYear(trailRuns)
  const totalKm = getTotalKmThisYear(trailRuns)
  return (totalKm / numberOfRuns).toFixed(2)
}

export function getNumberOfNordic(activities: ActivityType[]) {
  let total = 0
  activities.map((a) => {
    if (a.sportType === 'NordicSki' && isThisSeason(a.startDate)) {
      total++
    }
  })
  return total
}

export function totalElevation(activities: ActivityType[]) {
  let total = 0
  activities.map((a) => {
    if (isThisSeason(a.startDate) && a.sportType === 'BackcountrySki') {
      total += a.totalElevGained
    }
  })
  return total
}

export function averageElevation(activities: ActivityType[]) {
  const total = totalElevation(activities)
  const number = getNumberOfBC(activities)
  return (total / number).toFixed(0)
}

export function getTotalKmNordic(activities: ActivityType[]) {
  let total = 0
  activities.map((a) => {
    if (a.sportType === 'NordicSki' && isThisSeason(a.startDate)) {
      total += a.distance
    }
  })
  return total / 1000
}

export function averageSpeedNordic(activities: ActivityType[]) {
  let time = 0
  activities.map((a) => {
    if (a.sportType === 'NordicSki' && isThisSeason(a.startDate)) {
      time += a.movingTime
    }
  })
  const totalKm = getTotalKmNordic(activities)
  return (totalKm / (time / 3600)).toFixed(1)
}

function groupActivitiesByDate(
  activites: ActivityType[]
): Map<string, Set<string>> {
  const dateMap = new Map<string, Set<string>>()

  activites.forEach((a) => {
    if (
      (a.sportType === 'BackcountrySki' ||
        a.sportType === 'NordicSki' ||
        a.sportType === 'AlpineSki') &&
      isThisSeason(a.startDate)
    ) {
      const date = a.startDate.slice(0, 10)
      if (!dateMap.has(date)) {
        dateMap.set(date, new Set<string>())
      }
      dateMap.get(date)?.add(a.sportType)
    }
  })
  return dateMap
}

export function getNumberOfSkidays(activities: ActivityType[]): number {
  const dateMap = groupActivitiesByDate(activities)
  return dateMap.size
}

export function getNumberOfResortDays(activities: ActivityType[]): number {
  const dateMap = groupActivitiesByDate(activities)
  let total = 0
  dateMap.forEach((sports) => {
    if (
      (sports.size === 1 && sports.has('AlpineSki')) ||
      (sports.size === 2 && sports.has('AlpineSki') && sports.has('NordicSki'))
    ) {
      total++
    }
  })
  return total
}

export function getNumberOfBC(activites: ActivityType[]): number {
  const dateMap = groupActivitiesByDate(activites)
  let total = 0
  dateMap.forEach((sports) => {
    if (
      (sports.size === 1 && sports.has('BackcountrySki')) ||
      (sports.size === 2 &&
        sports.has('BackcountrySki') &&
        sports.has('NordicSki'))
    ) {
      total++
    }
  })
  return total
}

export function getNumberOfMix(activities: ActivityType[]): number {
  const dateMap = groupActivitiesByDate(activities)
  let total = 0
  dateMap.forEach((sports) => {
    if (sports.has('BackcountrySki') && sports.has('AlpineSki')) {
      total++
    }
  })
  return total
}
