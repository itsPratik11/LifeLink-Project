"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(userId: string, data: any) {
  try {
    await db.update(user).set({
      name: data.name,
      mobileNumber: data.mobileNumber,
      alternateMobileNumber: data.alternateMobileNumber,
      bloodType: data.bloodType,
      gender: data.gender,
      address: data.address,
      state: data.state,
      district: data.district,
      city: data.city,
    }).where(eq(user.id, userId));
    
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, error: "Failed to update profile." };
  }
}
