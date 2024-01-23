"use server"

import { z } from "zod"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async(values: z.infer<typeof RegisterSchema>) => {
const validatedFields = RegisterSchema.safeParse(values);

if(!validatedFields) {
        return { error: "Invalid fields!" };
    }

    //@ts-ignore
    const { email, password, name } = validatedFields?.data;

    const hahsedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    
    if(existingUser) {
        return { error: "Email already in use" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hahsedPassword
        }
    })
 
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken?.email, verificationToken?.token)

    return { success: "Confirmation email sent" }
}