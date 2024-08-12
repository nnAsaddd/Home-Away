"use client";

import ButtonLoader from "@/components/ButtonLoader";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createProfileAction } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CreateProfile = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { isPending, mutate } = useMutation({
    mutationFn: (formData: FormData) => createProfileAction(formData),
    onSuccess: (data) => {
      toast({ description: data.message });
      if (data.success) {
        router.push("/");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create user</h1>
      <div className="border p-8 rounded-md max-w-6xl">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-4 mt-4 ">
            <FormInput type="text" name="firstName" label="First Name" />
            <FormInput type="text" name="lastName" label="Last Name" />
            <FormInput type="text" name="username" label="Username" />
          </div>
          <Button className="mt-8 capitalize" type="submit">
            {isPending ? <ButtonLoader /> : "create user"}
          </Button>
        </form>
      </div>
    </section>
  );
};
export default CreateProfile;
