import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/helpers/cognito";
import { toastNotifier } from "@/utils/toastNotifier";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    preferredUsername: z
      .string()
      .min(3, { message: "preferredUsername must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredUsername: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toastNotifier({
      message: "Processing your registration...",
      type: "loading",
      duration: 3000,
    });

    try {
      // Call the registerUser function
      await registerUser(values.email, values.preferredUsername , values.password);

      toastNotifier({
        message: "Registration successful! Please check your email for verification.",
        type: "success",
        duration: 4000,
      });

      Navigate("/confirm-email");
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred. Please try again.";

      toastNotifier({
        message: errorMessage,
        type: "error",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="preferredUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>preferredUsername</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe"
                  {...field}
                  className="bg-white/50 dark:bg-gray-800/50"
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
                  placeholder="john@example.com"
                  {...field}
                  className="bg-white/50 dark:bg-gray-800/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                    className="bg-white/50 dark:bg-gray-800/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 bg-transparent border-0 right-0 pr-3 flex items-center text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                    className="bg-white/50 dark:bg-gray-800/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute inset-y-0 bg-transparent border-0 right-0 pr-3 flex items-center text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
