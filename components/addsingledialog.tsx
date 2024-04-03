import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Input from "./InputFields/input";
import { Button } from "./ui/button";
import { addSingleActivity } from "@/queries/activities";

type AddActivityFormField = {
  id: number;
};

export default function AddSingleDialog() {
  const methods = useForm<AddActivityFormField>();

  const addSingleActivityMutation = useMutation({
    mutationFn: (data: AddActivityFormField) => {
      const id = data.id;
      console.log("Adding activity with id: ", id);
      return addSingleActivity(id);
    },
  });

  const handleSubmit = async (data: AddActivityFormField) => {
    const mutationPromise = addSingleActivityMutation.mutateAsync(data);

    toast.promise(mutationPromise, {
      loading: "Adding activity...",
      success: "Activity added",
      error: "An error occurred while adding activity",
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="text-m font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer">
        Add
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add single activity</DialogTitle>
          <DialogDescription>
            Write the id of the activity you wish to add
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <Input
                type="tel"
                fieldName="id"
                label="Activity ID"
                placeholder="Activity ID"
              />
              <Button type="submit" className="mt-3">
                Add
              </Button>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
