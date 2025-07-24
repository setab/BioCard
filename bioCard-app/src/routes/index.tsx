import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted to-primary/10">
      <div className="rounded-2xl bg-white/90 dark:bg-background/80 p-10 shadow-xl flex flex-col items-center max-w-md w-full border border-muted">
        <h1 className="text-3xl font-bold mb-4 text-primary tracking-tight">
          Welcome to <span className="text-accent-foreground">BioCard</span>
        </h1>
        <p className="mb-3 text-muted-foreground text-center font-medium">
          BioCard is an{" "}
          <span className="font-semibold text-primary">
            NFC-based patient record system
          </span>
          . It allows healthcare providers to securely access and update patient
          information using NFC-enabled devices, ensuring quick and reliable
          care.
        </p>
        <p className="mb-8 text-muted-foreground text-center font-medium">
          Get started by clicking the button below.
        </p>
        <Link to="/login" className="w-full">
          <Button className="w-full py-6 text-lg font-bold shadow-md transition-all hover:scale-105">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
