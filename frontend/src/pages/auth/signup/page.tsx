import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
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
import { useCreateUser } from "@/requests/gen/react-query/user";

const googleProvider = new GoogleAuthProvider();

interface SignUpForm {
  firstName: string;
  lastName?: string; // Optional field
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Signup page for users to create an account
 * @returns {JSX.Element} SignupPage component
 */
export default function SignupPage(): JSX.Element {
  const { user } = useUser();
  const createUser = useCreateUser();

  const form = useForm<SignUpForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  async function onSubmit(formData: SignUpForm) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // Create user in the database
      await createUser.mutate(
        {
          data: {
            user_id: userCredential.user.uid,
            user_first: formData.firstName,
            user_last: formData.lastName || "", // Optional field
            email: formData.email,
          },
        },
        {
          onError: (error) => {
            form.setError("root.serverError", {
              type: error.code,
              message: error.message,
            });
            console.error("Error creating user in database:", error.message);
          },
        }
      );

      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
      }
    } catch (error) {
      form.setError("root.serverError", {
        type: (error as any).code,
        message: (error as any).message,
      });
      console.error("Error signing up:", (error as any).message);
    }
  }

  async function handleGoogleSignUp() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      form.setError("root.serverError", {
        type: (error as any).code,
        message: (error as any).message,
      });
      console.error("Error signing up:", (error as any).message);
    }
  }

  return (
    <div className="flex justify-center h-full sm:p-12">
      <Card className="sm:max-w-96 w-full text-center">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Join us by signing up</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              onClick={handleGoogleSignUp}
              variant={"outline"}
              className="w-full text-md font-normal"
            >
              <img
                className="w-6 h-6 mr-2"
                src={GoogleLogo}
                loading="lazy"
                alt="google logo"
              />
              Sign up with Google
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
                rules={{ required: "First Name is required" }}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="firstName"
                        autoComplete="given-name"
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
                        {...field}
                        type="text"
                        id="lastName"
                        autoComplete="family-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{ required: "Email is required" }}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" autoComplete="email" />
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
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{
                  required: "Confirm Password is required",
                  validate: (value, formData) =>
                    value === formData.password || "Passwords must match",
                }}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
              {form.formState.errors.root?.serverError && (
                <ErrorText text={"Error signing up. Please try again."} />
              )}
            </form>
          </Form>
          <p className="text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Log in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
