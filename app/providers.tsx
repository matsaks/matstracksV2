'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LngLatLike } from 'mapbox-gl'
import { createContext, ReactNode, useState } from 'react'

interface ProvidersProps {
  children: ReactNode
}

interface LocationContextType {
  location: LngLatLike
  setLocation: React.Dispatch<React.SetStateAction<LngLatLike>>
}

export const LocationContext = createContext<LocationContextType>({
  location: [11.39808, 47.2615],
  setLocation: () => {},
})

const LocationProvider = ({ children }: ProvidersProps) => {
  const [location, setLocation] = useState<LngLatLike>([11.39808, 47.2615])

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>{children}</LocationProvider>
    </QueryClientProvider>
  )
}
