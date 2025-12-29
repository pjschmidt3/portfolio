'use client'

import { LoadingIndicator } from '@/components/loading/loading-indicator'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail } from '@/server/contact/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

const ContactForm = () => {
  const [, formAction, loading] = useActionState(sendContactEmail, initialState)

  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email().trim(),
    subject: z.string(),
    message: z.string()
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  return loading ? (
    <LoadingIndicator message="Sending..." />
  ) : (
    <Form {...form}>
      <form
        action={formAction}
        className="w-full">
        <Card className="w-full">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subject"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button type="submit">Send Message</Button>
            </CardAction>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default ContactForm
