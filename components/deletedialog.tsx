"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { deleteActivity } from "@/queries/activities";
import Input from "./InputFields/input";

type DeleteFormField = {
  id: number;
};

export default function DeleteDialog() {
  const methods = useForm<DeleteFormField>();

  const deleteActivityMutation = useMutation({
    mutationFn: (data: DeleteFormField) => {
      const id = data.id;
      console.log("Deleting activity with id: ", id);
      return deleteActivity(id);
    },
  });

  const handleSubmit = async (data: DeleteFormField) => {
    const mutationPromise = deleteActivityMutation.mutateAsync(data);

    toast.promise(mutationPromise, {
      loading: "Deleting activity...",
      success: "Activity deleted",
      error: "An error occurred while deleting activity",
    });
  };

  return (
    <Dialog>
      <DialogTrigger>Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete activity</DialogTitle>
          <DialogDescription>
            Write the id of the activity you wish to delete
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <Input
                type="number"
                fieldName="id"
                label="Activity ID"
                placeholder="Activity ID"
              />
              <Button type="submit">Delete</Button>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
