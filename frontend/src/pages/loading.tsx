import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex space-x-2 text-muted-foreground">
        <Loader2 className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
