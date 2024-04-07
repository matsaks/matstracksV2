"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import React from "react";

import DeleteDialog from "./deletedialog";
import SyncronizationButton from "./syncronizationbutton";
import AddSingleDialog from "./addsingledialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex items-center space-x-6 lg:space-x-8 mt-2 mb-4 px-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center flex-grow gap-4">
        <NavItem href={"/"} isActive={pathname === "/"}>
          Homepage
        </NavItem>
        <NavItem href="/running" isActive={pathname === "/running"}>
          Running
        </NavItem>
        <NavItem href="/skiing" isActive={pathname === "/skiing"}>
          Skiing
        </NavItem>
      </div>

      <div className="hidden sm:block">
        <div className="flex items-center ml-auto gap-4 ">
          <SyncronizationButton />
          <AddSingleDialog />
          <DeleteDialog />
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <HamburgerMenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col items-start gap-4">
            <SyncronizationButton />
            <AddSingleDialog />
            <DeleteDialog />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavItem = ({ isActive, href, children }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`text-m font-medium ${
        isActive ? "text-primary" : "text-muted-foreground"
      } transition-colors hover:text-primary`}
    >
      {children}
    </Link>
  );
};
