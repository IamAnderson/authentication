"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import {v4 as uuidv4} from "uuid";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generatePasswordResetToken } from "@/lib/tokens";

export async function reset(
  values: z.infer<typeof ResetSchema>,
  callbackUrl?: string | null
) {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
  
    const { email } = validatedFields.data;
  
    const existingUser = await getUserByEmail(email);
  
    if (!existingUser) {
      return { error: "Email not found!" };
    }
    
    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset email sent!" }
  
}
