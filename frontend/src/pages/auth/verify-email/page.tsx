import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmailPage(): JSX.Element {
  const { user } = useUser();
  const { toast } = useToast();
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(0); // New state for countdown

  useEffect(() => {
    const refreshUser = async () => {
      if (user) {
        await user.reload();
      }
    };
    refreshUser();
  }, [user]);

  // If user is already verified or the user isn't authenticated, redirect
  if ((user && user.emailVerified) || !user) {
    return <Navigate to="/" />;
  }

  // Handle resend email
  const resendEmail = async () => {
    if (user) {
      try {
        setResent(true);
        setCountdown(30); // Start countdown from 30
        await sendEmailVerification(user);
        toast({
          title: "Verification Email Sent",
          description: "Please check your inbox for the verification link.",
        });
      } catch (err: any) {
        console.error(err.message);
        toast({
          variant: "destructive",
          title: "Error Sending Email",
          description: err.message || "Failed to send verification email.",
        });
        setResent(false);
        setCountdown(0);
      }
    }
  };

  // Countdown effect
  useEffect(() => {
    if (countdown === 0) {
      setResent(false); // Re-enable button
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex justify-center items-center p-4">
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
          <Button variant="outline" onClick={resendEmail} disabled={resent}>
            {resent ? `Resend in ${countdown}s` : "Resend Verification Email"}
          </Button>
          <p className="text-muted-foreground text-sm">
            Once you’ve verified your email, refresh this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
