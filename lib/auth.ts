import { betterAuth, facebook, google } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { env } from "./env";
import { organization } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./resend";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword :{
    enabled : true,
    async sendResetPassword({user, url}){
      await sendEmail({
        to: user.email,
        subject: "Reset Your FitRavity Password",
        html : `<body style="margin:0;padding:40px 20px;background:#0b0b0b;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">

        <table
          role="presentation"
          width="600"
          cellspacing="0"
          cellpadding="0"
          style="
            background:#141414;
            border:1px solid #2a2a2a;
            overflow:hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td align="center" style="padding:50px 40px 30px;">
              <h1
                style="
                  margin:0;
                  font-size:40px;
                  font-weight:900;
                  letter-spacing:2px;
                  color:#ffffff;
                "
              >
                FIT<span style="color:#B8FF2C;">RAVITY</span>
              </h1>

              <p
                style="
                  margin-top:12px;
                  font-size:15px;
                  color:#8f8f8f;
                "
              >
                Train Hard. Stay Consistent.
              </p>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding:0 45px;">
              <h2
                style="
                  margin:0;
                  font-size:32px;
                  font-weight:800;
                  color:#ffffff;
                  line-height:42px;
                "
              >
                Reset Your Password
              </h2>

              <p
                style="
                  margin-top:25px;
                  font-size:16px;
                  line-height:30px;
                  color:#c8c8c8;
                "
              >
                We received a request to reset the password for your
                FitRavity account. Click the button below to create a new,
                secure password.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:40px;">
              <a
                href="${url}"
                style="
                  display:inline-block;
                  background:#B8FF2C;
                  color:#000000;
                  font-size:16px;
                  font-weight:bold;
                  padding:18px 42px;
                  text-decoration:none;
                "
              >
                RESET PASSWORD
              </a>
            </td>
          </tr>

          <!-- Security Info -->
          <tr>
            <td style="padding:0 45px 35px;">
              <div
                style="
                  background:#1d1d1d;
                  border:1px solid #2f2f2f;
                  padding:24px;
                "
              >
                <h3
                  style="
                    margin-top:0;
                    margin-bottom:15px;
                    color:#B8FF2C;
                    font-size:18px;
                  "
                >
                  Security Notice
                </h3>

                <p
                  style="
                    margin:0;
                    color:#c5c5c5;
                    line-height:30px;
                    font-size:15px;
                  "
                >
                  ✔ This link can only be used once.<br>
                  ✔ Choose a strong, unique password.<br>
                  ✔ Never share your password with anyone.<br>
                  ✔ Your current password remains active until you complete the reset.
                </p>
              </div>
            </td>
          </tr>

          <!-- Expiry -->
          <tr>
            <td style="padding:0 45px;">
              <p
                style="
                  font-size:15px;
                  color:#9d9d9d;
                  line-height:28px;
                "
              >
                This password reset link will expire in
                <strong style="color:#ffffff;">30 minutes</strong>.
              </p>

              <p
                style="
                  font-size:15px;
                  color:#9d9d9d;
                  line-height:28px;
                "
              >
                If you didn't request a password reset, you can safely ignore
                this email. Your password will remain unchanged.
              </p>
            </td>
          </tr>

          <!-- Fallback -->
          <tr>
            <td style="padding:35px 45px;">
              <p
                style="
                  margin-bottom:12px;
                  font-size:14px;
                  color:#888;
                "
              >
                Button not working? Copy and paste this link into your browser:
              </p>

              <p
                style="
                  word-break:break-all;
                  font-size:13px;
                  color:#B8FF2C;
                "
              >
                ${url}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding:30px;
                background:#101010;
                border-top:1px solid #2a2a2a;
              "
            >
              <p
                style="
                  margin:0;
                  font-size:14px;
                  color:#ffffff;
                  font-weight:bold;
                "
              >
                FIT<span style="color:#B8FF2C;">RAVITY</span>
              </p>

              <p
                style="
                  margin-top:10px;
                  font-size:13px;
                  color:#777777;
                "
              >
                Discipline • Consistency • Results
              </p>

              <p
                style="
                  margin-top:18px;
                  font-size:12px;
                  color:#555555;
                "
              >
                © 2026 FitRavity. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>`
      })
    }
  },
  emailVerification:{
    sendOnSignIn : true,
    autoSignInAfterVerification : true,
sendVerificationEmail : async({user, url}) =>{
  await sendEmail({
    to: user.email,
    subject: "Welcome to FitRavity",
    html : `<body style="margin:0;padding:40px 20px;background:#0b0b0b;font-family:Arial,Helvetica,sans-serif;"> <table role="presentation" width="100%" cellspacing="0" cellpadding="0"> <tr> <td align="center"> <table role="presentation" width="600" cellspacing="0" cellpadding="0" style=" background:#141414; border:1px solid #2a2a2a; overflow:hidden; "> <!-- Header --> <tr> <td align="center" style="padding:50px 40px 30px;"> <h1 style=" margin:0; font-size:40px; font-weight:900; letter-spacing:2px; color:#ffffff; "> FIT<span style="color:#B8FF2C;">RAVITY</span> </h1> <p style=" margin-top:12px; font-size:15px; color:#8f8f8f; "> Train Hard. Stay Consistent. </p> </td> </tr> <!-- Title --> <tr> <td align="center" style="padding:0 45px;"> <h2 style=" margin:0; font-size:32px; font-weight:800; color:#ffffff; line-height:42px; "> Verify Your Email </h2> <p style=" margin-top:25px; font-size:16px; line-height:30px; color:#c8c8c8; "> Welcome to FitRavity! You're just one click away from activating your account and beginning your fitness journey. Click the button below to verify your email address. </p> </td> </tr> <!-- Button --> <tr> <td align="center" style="padding:40px;"> <a href="${url}" style=" display:inline-block; background:#B8FF2C; color:#000000; font-size:16px; font-weight:bold; padding:18px 42px; text-decoration:none; "> VERIFY EMAIL </a> </td> </tr> <!-- Info --> <tr> <td style="padding:0 45px 35px;"> <div style=" background:#1d1d1d; border:1px solid #2f2f2f;  padding:24px; "> <h3 style=" margin-top:0; margin-bottom:15px; color:#B8FF2C; font-size:18px; "> Why verify your email? </h3> <p style=" margin:0; color:#c5c5c5; line-height:30px; font-size:15px; "> ✔ Secure your account<br> ✔ Access your personalized dashboard<br> ✔ Receive trainer updates and workout plans<br> ✔ Track your fitness progress </p> </div> </td> </tr> <!-- Expiry --> <tr> <td style="padding:0 45px;"> <p style=" font-size:15px; color:#9d9d9d; line-height:28px; "> This verification link will expire in <strong style="color:#ffffff;">30 minutes</strong>. </p> <p style=" font-size:15px; color:#9d9d9d; line-height:28px; "> If you didn't create this account, you can safely ignore this email. </p> </td> </tr> <!-- Fallback --> <tr> <td style="padding:35px 45px;"> <p style=" margin-bottom:12px; font-size:14px; color:#888; "> Button not working? Copy this link: </p> <p style=" word-break:break-all; font-size:13px; color:#B8FF2C; "> ${url} </p> </td> </tr> <!-- Footer --> <tr> <td align="center" style=" padding:30px; background:#101010; border-top:1px solid #2a2a2a; "> <p style=" margin:0; font-size:14px; color:#ffffff; font-weight:bold; "> FIT<span style="color:#B8FF2C;">RAVITY</span> </p> <p style=" margin-top:10px; font-size:13px; color:#777777; "> Discipline • Consistency • Results </p> <p style=" margin-top:18px; font-size:12px; color:#555555; "> © 2026 FitRavity. All rights reserved. </p> </td> </tr> </table> </td> </tr> </table> </body>`
  })
},
  },
  
  account:{
     identityStrategy: "provider-id",
    accountLinking : {
      enabled : true,
      trustedProviders: ["google"]
    },
  },
  socialProviders: {
    google :{
        clientId : env.GOOGLE_CLIENT_ID,
        clientSecret : env.GOOGLE_CLIENT_SECRET,
    },
  },
  user :{
    additionalFields : {
      role :{
        type : "string",
        input : false
      }
    }
  },
 plugins: [
        nextCookies(),
         organization() 
    ]
});

export type Session = typeof auth.$Infer.Session
export type user = typeof auth.$Infer.Session.user