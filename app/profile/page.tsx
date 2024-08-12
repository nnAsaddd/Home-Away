import UpdateProfile from "@/components/updateProfile/UpdateProfile";
import UpdateProfileImage from "@/components/updateProfile/UpdateProfileImage";
import {
  fetchUserProfileImage,
  getAuthUser,
  getSingleProfileAction,
} from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getAuthUser();
  if (!user) redirect("/profile/create");
  const profileImage = await fetchUserProfileImage();
  if (!profileImage) redirect("/profile/create");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["profile", user.id],
    queryFn: () => getSingleProfileAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <h1 className="text-2xl font-semibold mb-8 capitalize">user profile</h1>
        <div className="border p-8 rounded-md max-w-6xl">
          <UpdateProfileImage profileImage={profileImage} />
          <UpdateProfile id={user.id} />
        </div>
      </section>
    </HydrationBoundary>
  );
};
export default ProfilePage;
