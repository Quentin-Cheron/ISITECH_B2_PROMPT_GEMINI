import { db } from "@/lib/db";

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificatuonToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificatuonToken;
  } catch {
    return null;
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificatuonToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificatuonToken;
  } catch {
    return null;
  }
}
