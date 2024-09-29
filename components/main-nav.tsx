'use client'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import React, { useContext } from 'react'
import SyncronizationButton from './syncronizationbutton'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { FaLocationDot } from 'react-icons/fa6'
import { LocationContext } from '@/app/providers'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { LngLatLike } from 'mapbox-gl'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex items-center space-x-6 lg:space-x-8 mt-2 mb-4 px-2',
        className
      )}
      {...props}
    >
      <div className="flex items-center flex-grow gap-4">
        <NavItem href={'/'} isActive={pathname === '/'}>
          Heatmap
        </NavItem>
        <NavItem href="/fot" isActive={pathname === '/fot'}>
          Fot
        </NavItem>
        <NavItem href="/ski" isActive={pathname === '/ski'}>
          Ski
        </NavItem>
      </div>
      <div>
        <div className="flex items-center ml-auto gap-8 mr-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <FaLocationDot className="text-xl text-muted-foreground transition-colors hover:text-primary cursor-pointer" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-auto min-w-max pt-10 flex flex-col"
              aria-describedby="location-description"
            >
              <VisuallyHidden id="location-description">
                List of locations to navigate to
              </VisuallyHidden>
              <VisuallyHidden>
                <SheetTitle>Locations</SheetTitle>
              </VisuallyHidden>
              <LocationItem
                name="Innsbruck"
                coordinates={[11.39808, 47.2615]}
              />
              <LocationItem
                name="Ålesund"
                coordinates={[6.327062, 62.463208]}
              />
              <LocationItem
                name="Trondheim"
                coordinates={[10.408688, 63.425038501]}
              />
              <LocationItem
                name="Hjørundfjorden"
                coordinates={[10.41, 62.21]}
              />
              <LocationItem name="Nordfjord" coordinates={[5.936, 61.761]} />
              <LocationItem name="Nordmøre" coordinates={[8.97, 62.94]} />
            </SheetContent>
            <SyncronizationButton />
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

interface NavItemProps {
  href: string
  isActive: boolean
  children: React.ReactNode
}

const NavItem = ({ isActive, href, children }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`text-m font-medium ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      } transition-colors hover:text-primary`}
    >
      {children}
    </Link>
  )
}

interface LocationItemProps {
  name: string
  coordinates: LngLatLike
}

const LocationItem = ({ name, coordinates }: LocationItemProps) => {
  const { setLocation } = useContext(LocationContext)
  return (
    <Button size={'sm'} onClick={() => setLocation(coordinates)}>
      {name}
    </Button>
  )
}
