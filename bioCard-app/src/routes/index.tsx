import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome to BioCard</h1>
        <p className="mb-4 text-gray-600 text-center">
          BioCard is an NFC-based patient record system. It allows healthcare
          providers to securely access and update patient information using
          NFC-enabled devices, ensuring quick and reliable care.
        </p>
        <p className="mb-6 text-gray-600 text-center">
          Get started by clicking the button below.
        </p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}
