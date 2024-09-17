import { Resend } from "resend";

// Templates

import generateAuthCodeEmailTemplate from "@/lib/template/oauth";
import generateConfirmEmailTemplate from "@/lib/template/confirmEmail";
import generatePasswordResetEmailTemplate from "@/lib/template/resetPassword";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two-factor authentication code",
    html: generateAuthCodeEmailTemplate(token),
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: generatePasswordResetEmailTemplate(resetLink),
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: generateConfirmEmailTemplate(confirmLink),
  });
}
