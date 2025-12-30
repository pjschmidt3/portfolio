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
import {
  UserIcon,
  MailIcon,
  MessageSquareIcon,
  FileTextIcon,
  SendIcon
} from 'lucide-react'
import { motion, type Variants } from 'motion/react'

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

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  }

  return loading ? (
    <LoadingIndicator message="Sending..." />
  ) : (
    <Form {...form}>
      <motion.form
        action={formAction}
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}>
        <Card className="w-full shadow-lg">
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="inline-flex items-center gap-2">
                      <UserIcon className="size-4 text-muted-foreground" />
                      First Name
                    </FormLabel>
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
                    <FormLabel className="inline-flex items-center gap-2">
                      <UserIcon className="size-4 text-muted-foreground" />
                      Last Name
                    </FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center gap-2">
                    <MailIcon className="size-4 text-muted-foreground" />
                    Email
                  </FormLabel>
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
                  <FormLabel className="inline-flex items-center gap-2">
                    <MessageSquareIcon className="size-4 text-muted-foreground" />
                    Subject
                  </FormLabel>
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
                  <FormLabel className="inline-flex items-center gap-2">
                    <FileTextIcon className="size-4 text-muted-foreground" />
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your message here..."
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <CardAction>
              <Button
                type="submit"
                size="lg"
                className="gap-2">
                <SendIcon className="size-4" />
                Send Message
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </motion.form>
    </Form>
  )
}

export default ContactForm
