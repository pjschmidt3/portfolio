'use server'
import { z } from 'zod'
import { sendEmail } from '@/services/resend-service'

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email().trim(),
  subject: z.string(),
  message: z.string()
})

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  errors?: {
    firstName: string[]
    lastName: string[]
    email: string[]
    subject: string[]
    message: string[]
  }
}

export async function sendContactEmail(
  _prevState: ContactFormData,
  formData: FormData
): Promise<ContactFormData> {
  const formValues = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  }
  const validatedFields = schema.safeParse(formValues)

  if (!validatedFields.success) {
    console.error(z.treeifyError(validatedFields.error))
    throw new Error('Error sending email')
  }

  await sendEmail(validatedFields.data)
  return validatedFields.data
}
