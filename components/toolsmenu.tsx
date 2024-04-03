"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import SyncronizationButton from "./syncronizationbutton";
import React from "react";
import DeleteDialog from "./deletedialog";
import AddSingleDialog from "./addsingledialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";

export default function ToolsMenu() {
  return (
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger className="text-m font-medium text-muted-foreground transition-colors hover:text-primary">
    //         Tools
    //       </NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
    //           <ListItem key="Sync" title="Sync">
    //             <SyncronizationButton />
    //           </ListItem>
    //           <ListItem key="Delete" title="Delete">
    //             <DeleteDialog />
    //           </ListItem>
    //           <ListItem key="Add" title="Add">
    //             <AddSingleDialog />
    //           </ListItem>
    //         </ul>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>

    // <DropdownMenu>
    //   <DropdownMenuTrigger>Tools</DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuLabel>Sync</DropdownMenuLabel>
    //     <DropdownMenuItem>
    //       <SyncronizationButton />
    //     </DropdownMenuItem>
    //     <DropdownMenuLabel>Update</DropdownMenuLabel>
    //     <DropdownMenuItem>
    //       <DeleteDialog />
    //     </DropdownMenuItem>
    //     {/* <DropdownMenuItem>
    //       <AddSingleDialog />
    //     </DropdownMenuItem> */}
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <Dialog.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {/* <button className="text-m font-medium text-muted-foreground transition-colors hover:text-primary">
            Tools
          </button> */}
          <div className="text-m font-medium text-muted-foreground transition-colors hover:text-primary">
            Tools
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Sync</DropdownMenu.Label>
          <DropdownMenu.Item>
            <SyncronizationButton />
          </DropdownMenu.Item>
          <DropdownMenu.Label>Delete</DropdownMenu.Label>
          <DropdownMenu.Item>
            <DeleteDialog />
          </DropdownMenu.Item>
          <DropdownMenu.Label>Add</DropdownMenu.Label>
          <DropdownMenu.Item>
            <AddSingleDialog />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Dialog.Root>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
