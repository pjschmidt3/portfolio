import { CreateEmailResponse, Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface SendEmailData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export async function sendEmail({
  firstName,
  lastName,
  email,
  subject = '',
  message
}: SendEmailData): Promise<CreateEmailResponse> {
  return await resend.emails.send({
    from: 'Portfolio Contact Form<onboarding@resend.dev>',
    to: process.env.PERSONAL_EMAIL_ADDRESS as string,
    template: {
      id: process.env.RESEND_TEMPLATE_ID as string,
      variables: {
        sender_first_name: firstName,
        sender_last_name: lastName,
        sender_email: email,
        subject,
        message
      }
    }
  })
}
