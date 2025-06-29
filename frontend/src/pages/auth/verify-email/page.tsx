import { useState } from "react";
import { Navigate } from "react-router";
import { sendEmailVerification } from "firebase/auth";
import { useUser } from "@/auth/UserContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function VerifyEmailPage(): JSX.Element {
  const { user } = useUser();
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is already verified, redirect
  if (user && user.emailVerified) {
    return <Navigate to="/" />;
  }

  // Resend verification email
  const resendEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setResent(true);
        setError(null);
      } catch (err: any) {
        setError("Failed to send verification email. Please try again later.");
        console.error(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full sm:max-w-md text-center">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We sent a verification email to <strong>{user?.email}</strong>.
            Please check your inbox and click the verification link.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Separator />
          {resent && (
            <p className="text-green-600 text-sm">
              Verification email resent! Please check your inbox.
            </p>
          )}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button variant="outline" onClick={resendEmail}>
            Resend Verification Email
          </Button>
          <p className="text-muted-foreground text-sm">
            Once you’ve verified your email, refresh this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
