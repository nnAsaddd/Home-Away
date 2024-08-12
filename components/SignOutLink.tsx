"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { IoExitOutline } from "react-icons/io5";

const SignOutLink = () => {
  const { toast } = useToast();
  const handleSubmit = () => {
    toast({ description: "You have been signed out!!!" });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="flex gap-[6px] items-center" onClick={handleSubmit}>
        <IoExitOutline />
        <span>Sign out</span>
      </button>
    </SignOutButton>
  );
};
export default SignOutLink;
