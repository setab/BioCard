import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { apiClient } from "@/lib/api";
import { env } from "@/lib/env";
import { useAuth } from "@/hooks/useAuth";

const LogInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(4),
});
type FormField = z.infer<typeof LogInFormSchema>;
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const LogInMutation = useMutation({
    mutationFn: async (params: FormField) => {
      console.log(params);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log(`data: ${data}; data.data: ${JSON.stringify(data)}`);
      auth.login(data);
      setTimeout(() => {
        // Your code to execute after 100ms
        navigate({
          from: Route.fullPath,
          to: "/admin/dashboard",
        });
      }, 100);
    },
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const result = await LogInMutation.mutateAsync(data);
      console.log("Login successful:", result);
    } catch (error) {
      console.error("Login error:", error);
      form.setError("email", {
        message: "Invalid email or password",
      });
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-gray-200 p-8">
        {/* Logo at the top */}
        <div>
          {/* Replace with your logo */}
          <img src="/logo.svg" alt="Logo" className="h-12 mb-4" />
        </div>
        {/* Text at the bottom */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Welcome to {env.VITE_APP_NAME}</h2>
          <p className="text-gray-700 mt-2">
            Your digital identity, simplified. Manage your bio cards with ease.
          </p>
        </div>
      </div>
      {/* Right side (login form) */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
        <div className="max-w-sm mx-auto w-full p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        {...field}
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
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
