"use client";

import { syncronizeActivities } from "@/queries/activities";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function SyncronizationButton() {
  const mutation = useMutation({
    mutationFn: () => syncronizeActivities(),
    onSuccess: (data: any[]) => {
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
    <div
      className="text-m font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
      onClick={handleSync}
    >
      Synkroniser aktiviteter
    </div>
  );
}
