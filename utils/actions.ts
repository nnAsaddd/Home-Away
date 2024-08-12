"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  profileFormSchema,
  propertySchema,
  validateWithZodSchema,
} from "./schemas";
import { redirect } from "next/navigation";
import db from "./db";
import { uploadImage } from "./supabase";
import { Prisma } from "@prisma/client";

export const fetchUserProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;
  let profile;

  try {
    profile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        profileImage: true,
      },
    });
    if (!profile) throw new Error("Profile not found");
  } catch (error) {
    console.log(error);
  }
  return profile?.profileImage;
};

export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User must be logged in to access this route");
  if (!user?.privateMetadata?.hasProfile) redirect("/profile/create");

  return user;
};

export const createProfileAction = async (
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedData = validateWithZodSchema(profileFormSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedData,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    return {
      success: true,
      message: "Profile created successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error?.message : "Something went wrong!!!";

    return { success: false, message };
  }
};

export const getSingleProfileAction = async () => {
  try {
    const user = await getAuthUser();
    if (!user) redirect("/profile/create");

    const fetchedProfile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    return {
      success: true,
      message: "Profile fetched successfully",
      profile: fetchedProfile,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error?.message : "Something went wrong!!!";

    return { success: false, message, profile: null };
  }
};

export const updateProfileAction = async (
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to update a profile");

    const rawData = Object.fromEntries(formData);
    const validatedData = validateWithZodSchema(profileFormSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        ...validatedData,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error?.message : "Something went wrong!!!";

    return { success: false, message };
  }
};

export const updateProfileImageAction = async (
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const validatedImage = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedImage.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });

    return { message: "Profile image updated successfully" };
  } catch (error) {
    const message =
      error instanceof Error ? error?.message : "Something went wrong!!!";
    return { message };
  }
};

export const createPropertyAction = async (
  formData: FormData
): Promise<{ success: boolean; message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validatedData = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedData,
        image: fullPath,
        profileId: user.id,
      },
    });

    return { success: true, message: "Property created successfully" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!!!";
    return { success: false, message };
  }
};

export const fetchPropertiesAction = async (
  category?: string,
  search?: string
) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },

    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
  });
  return properties;
};
