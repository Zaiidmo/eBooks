import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Eye, EyeOff } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const otpSchema = z.object({
  otp: z.array(z.string().length(1, "Each OTP digit must be 1 character")).length(6, "OTP must be 6 digits"),
})

export default function LoginForm() {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([])

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: Array(6).fill(""),
    },
  })

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    setIsOtpStep(true)
  }

  function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    console.log(values.otp.join(''))  // Combine OTP array into a single string for submission
  }

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otpForm.getValues('otp')]
    newOtp[index] = value
    otpForm.setValue('otp', newOtp, { shouldValidate: true })

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
      otpInputs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="space-y-6">
      {!isOtpStep ? (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="bg-white/50 dark:bg-gray-800/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input type={ showPassword ? "text": "password"} placeholder="Enter your password" {...field} className="bg-white/50 dark:bg-gray-800/50" />
                      <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 bg-transparent border-0 right-0 pr-3 flex items-center text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 opacity-70 hover:opacity-100" />
                      ) : (
                        <Eye className="h-4 w-4 opacity-70 hover:opacity-100" />
                      )}
                    </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Log in</Button>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4 flex-col flex items-center ">
            <FormField
              control={otpForm.control}
              name="otp"
              render={() => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <div className="flex justify-center gap-2">
                      {[...Array(6)].map((_, index) => (
                        <Input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="w-12 h-12 text-center text-2xl font-bold rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
                          ref={el => otpInputs.current[index] = el}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          inputMode="numeric"
                          pattern="\d*"
                          value={otpForm.getValues("otp")[index]}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Verify OTP</Button>
          </form>
        </Form>
      )}
    </div>
  )
}
