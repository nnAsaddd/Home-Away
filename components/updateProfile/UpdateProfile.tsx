"use client";

import ButtonLoader from "@/components/ButtonLoader";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateProfileAction, getSingleProfileAction } from "@/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const UpdateProfile = ({ id }: { id: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getSingleProfileAction(),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (formData: FormData) => updateProfileAction(formData),
    onSuccess: (data) => {
      toast({ description: data.message });
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        router.push("/");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };

  const profile = data?.profile;
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4 mt-4 ">
        <FormInput
          type="text"
          name="firstName"
          label="First Name"
          defaultValue={profile?.firstName}
        />
        <FormInput
          type="text"
          name="lastName"
          label="Last Name"
          defaultValue={profile?.lastName}
        />
        <FormInput
          type="text"
          name="username"
          label="Username"
          defaultValue={profile?.username}
        />
      </div>
      <Button className="mt-4 capitalize" type="submit">
        {isPending ? <ButtonLoader /> : "update user"}
      </Button>
    </form>
  );
};
export default UpdateProfile;
