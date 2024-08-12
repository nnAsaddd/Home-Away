import CreateProfile from "@/components/createProfile/CreateProfile";
import { getAuthUser } from "@/utils/actions";
import { redirect } from "next/navigation";

const CreateProfilePage = async () => {
  // Checking whether the user has already created a profile or not
  const user = await getAuthUser();
  if (user) redirect("/");
  return <CreateProfile />;
};
export default CreateProfilePage;
