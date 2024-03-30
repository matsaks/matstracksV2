"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { syncronizeActivities } from "@/queries/activities";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

// TODO fix isLoading

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [activePage, setActivePage] = useState(0);

  const mutation = useMutation({
    mutationFn: () => syncronizeActivities(),
    onSuccess: (data) => {
      if (data.length === 0) {
        toast.info("No new activities added.");
      } else {
        toast.success(
          `Syncronized. ${data.length} activities saved to the database: ${data
            .map((activity) => activity.name)
            .join(", ")}`
        );
      }
    },
    onError: () => {
      toast.error("An error occurred while synchronizing activities.");
    },
  });

  const handleSync = () => {
    mutation.mutate();
  };

  return (
    <nav
      className={cn(
        "flex items-center space-x-6 lg:space-x-8 mt-2 mb-4 pl-2",
        className
      )}
      {...props}
    >
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
      <div
        className="text-m font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
        onClick={handleSync}
      >
        Synkroniser
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
