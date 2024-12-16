import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRef, useState } from 'react'
import { confirmUser } from '@/helpers/cognito'
import { toastNotifier } from '@/utils/toastNotifier'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'


const otpSchema = z.object({
  otp: z.array(z.string().length(1, "Each OTP digit must be 1 character")).length(6, "OTP must be 6 digits"),
})

export default function OTP() {
  const otpInputs = useRef<(HTMLInputElement | null)[]>([])
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: Array(6).fill(""),
    },
  })
  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    const verificationKey = values.otp.join('')  
    const email = localStorage.getItem("UserEmail") || "";
    try {
      setLoading(true);
      const result = await confirmUser(email, verificationKey);
      toastNotifier ({ type: "success", message: result, duration: 5000 });
      localStorage.removeItem("UserEmail");
      Navigate("/login");
    } catch (error) {
      toastNotifier ({ type: "error", message: "OTP verification failed", duration: 5000 });
    } finally {
      setLoading(false);
    }
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
  
        !loading ? (<Form {...otpForm}>
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
            <Button type="submit" className="w-full">Verify Email</Button>
          </form>
        </Form>
  ) : ( 
    <Loader className="w-10 h-10" style={{ color: "#2563EB" }} />
  )
  )
}