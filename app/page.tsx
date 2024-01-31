import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔑Auth
        </h1>
        <p className={cn("text-white text-lg text-center", font.className)}>
          A simple authentication service
        </p>
        <div className="flex justify-center">
          <LoginButton mode="modal">
            <Button variant={"secondary"} size={"lg"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
