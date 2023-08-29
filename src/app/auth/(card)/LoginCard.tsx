import React from "react";

import { signIn } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z
  .object({
    email: z.coerce.string().email().min(1),
    password: z.coerce.string().min(1),
  })
  .required();

const LoginCard = () => {
  const [Loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    toast({
      title: "Login",
      description: "Logging an account",
    });
    try {
      const signinResponse = await signIn("credentials", {
        redirect: false, // Because using submit on a form tag, we want to cancel the redirect, and redirecting on our own using router
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl != null ? callbackUrl : "/",
      });
      console.log(signinResponse)
      if (signinResponse && signinResponse.error === null) {
        toast({
          title: "Login",
          description: "Login successful",
        });
        if (signinResponse.url != null) {
          router.replace(signinResponse.url)
        } else {
          router.replace("/")
        }
      } else {
        throw new Error("Signin failed");
      }
    } catch (e) {
      console.error(e)
      toast({
        title: "Login",
        description: "Login failed, check your email and password",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account to be able use our platform
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="todo@email.me"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Make sure your password is strong.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-4">
              <Button className="w-full" type="submit" disabled={Loading}>
                Login
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default LoginCard;
