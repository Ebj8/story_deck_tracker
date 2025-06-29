import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import GoogleLogo from "@/assets/google-logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth/firebase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ErrorText from "@/components/universal/ErrorText";
import { useUser } from "@/auth/UserContext";

const googleProvider = new GoogleAuthProvider();

interface LoginForm {
  firstName: string;
  lastName?: string; // Optional field for future use
  email: string;
  password: string;
}

/**
 * Login page for users to sign in
 * @returns {JSX.Element} LoginPage component
 */
export default function LoginPage(): JSX.Element {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" />;
  }

  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: LoginForm) {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      form.setError("root.serverError", {
        type: (error as any).code,
        message: (error as any).message,
      });
      console.log("Error logging in:", (error as any).message);
    }
  }

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      form.setError("root.serverError", {
        type: (error as any).code,
        message: (error as any).message,
      });
      console.log("Error logging in:", (error as any).message);
    }
  }

  return (
    <div className="flex justify-center h-full sm:p-12">
      <Card className="sm:max-w-96 w-full text-center">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              onClick={handleGoogleSignIn}
              variant={"outline"}
              className="w-full text-md font-normal"
            >
              <img
                className="w-6 h-6 mr-2"
                src={GoogleLogo}
                loading="lazy"
                alt="google logo"
              />
              Sign in with Google
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Separator className="my-4 flex-1" />
            <span className="text-muted-foreground">or</span>
            <Separator className="my-4 flex-1" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-left space-y-2"
            >
              <FormField
                control={form.control}
                rules={{ required: "Email is required" }}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{ required: "Password is required" }}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm p-0 text-muted-foreground hover:underline "
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  Sign In
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Don’t have an account?{" "}
                  <Link to="/auth/signup" className="underline">
                    Sign up here
                  </Link>
                </p>
              </div>

              {form.formState.errors.root?.serverError && (
                <ErrorText text={"Error logging in. Please contact support."} />
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
