"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password, newPassword } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  const passwordMatch = await bcryptjs.compare(
    password as string,
    existingUser?.password as string
  );

  if (passwordMatch) {
    return { error: "New password must be different from the old password!" };
  }

  if (password !== newPassword) {
    return { error: "Password dosen't match!" };
  }

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcryptjs.hash(password as string, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated!" };
}
