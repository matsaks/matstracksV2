"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

import DeleteDialog from "./deletedialog";
import SyncronizationButton from "./syncronizationbutton";
import AddSingleDialog from "./addsingledialog";

// TODO fix isLoading

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [activePage, setActivePage] = useState(0);

  return (
    <nav
      className={cn(
        "flex items-center space-x-6 lg:space-x-8 mt-2 mb-4 px-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center flex-grow gap-4">
        <NavItem
          href={"/"}
          isActive={activePage === 0}
          setCurrentPage={setActivePage}
          pageNumber={0}
        >
          Homepage
        </NavItem>
        <NavItem
          href="/running"
          isActive={activePage === 1}
          setCurrentPage={setActivePage}
          pageNumber={1}
        >
          Running
        </NavItem>
        <NavItem
          href="/skiing"
          isActive={activePage === 2}
          setCurrentPage={setActivePage}
          pageNumber={2}
        >
          Skiing
        </NavItem>
      </div>
      {/* <ToolsMenu /> */}

      <div className="flex items-center ml-auto gap-4">
        <SyncronizationButton />
        <AddSingleDialog />
        <DeleteDialog />
      </div>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  isActive: boolean;
  setCurrentPage: (page: number) => void;
  children: React.ReactNode;
  pageNumber: number;
}

function NavItem({
  isActive,
  href,
  children,
  setCurrentPage,
  pageNumber,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`text-m font-medium ${
        isActive ? "text-primary" : "text-muted-foreground"
      } transition-colors hover:text-primary`}
      onClick={() => setCurrentPage(pageNumber)}
    >
      {children}
    </Link>
  );
}

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";
