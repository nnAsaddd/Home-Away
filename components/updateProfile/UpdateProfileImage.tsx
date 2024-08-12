"use client";
import Image from "next/image";
import ImageInput from "../form/ImageInput";
import { Button } from "../ui/button";
import React from "react";
import { LuUser2 } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileImageAction } from "@/utils/actions";
import ButtonLoader from "../ButtonLoader";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const UpdateProfileImage = ({ profileImage }: { profileImage: string }) => {
  const [showUploadImage, setShowUploadImage] = React.useState(false);
  const icon = (
    <LuUser2 className="w-24 h-24 bg-primary rounded-md text-white" />
  );

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateProfileImageAction(formData),
    onSuccess: (data) => {
      toast({
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/profile");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };
  return (
    <div>
      {profileImage ? (
        <Image
          width={100}
          height={100}
          src={profileImage}
          alt="user"
          className="rounded-md"
        />
      ) : (
        icon
      )}
      <Button
        variant="outline"
        className="capitalize my-4"
        onClick={() => setShowUploadImage(!showUploadImage)}
      >
        update profile image
      </Button>
      {showUploadImage && (
        <form onSubmit={handleSubmit}>
          <ImageInput />
          <Button type="submit" className="capitalize mt-4">
            {isPending ? <ButtonLoader /> : "submit"}
          </Button>
        </form>
      )}
    </div>
  );
};
export default UpdateProfileImage;
