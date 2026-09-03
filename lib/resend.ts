import { Resend } from 'resend';
import { env } from './env';

const resend = new Resend(env.RESEND_API_KEY);

interface sendEmailValues{
  to : string,
  subject : string,
  html: string
}
export function sendEmail ({to,subject, html}:sendEmailValues){
resend.emails.send({
  from: 'onboarding@resend.dev',
  to,
  subject,
  html,
})}
